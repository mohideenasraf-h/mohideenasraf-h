using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ContactApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Services.Contact
{
    public class ContactService : IContactService
    {
        private string email_pattern = @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
        private string numeric = @"^(0|[1-9]\d*)$";
        private readonly DbContextHelper _context;
        public ContactService(DbContextHelper context)
        {
            _context = context;
        }

        public async Task<CustomResponse> GetContactList()
        {
            CustomResponse response = new();

            using (_context)
            {
                var contacts = await _context.Contacts.Where(w => w.RecordStatus == "Active").OrderByDescending(o => o.ModifiedDate).ToListAsync();

                response.IsSuccess = true;
                response.Data = new
                {
                    contacts
                };
            }

            return response;
        }

        /* create and update will happen in the same method */
        public async Task<CustomResponse> CreateUpdateContact(ContactApp.Models.Contact contact)
        {
            CustomResponse response = new();
            try
            {
                using (_context)
                {
                    if (contact == null)
                    {
                        response.Title = "Error";
                        response.Message = "Bad Request";
                        response.IsSuccess = false;
                        return response;
                    }

                    CustomResponse validate = ValidateContact(contact);
                    if (!validate.IsSuccess) return validate;

                    // update
                    if (contact.ContactId > 0)
                    {
                        var exContact = await _context.Contacts.AsNoTracking().FirstOrDefaultAsync(f => f.ContactId == contact.ContactId);
                        if (exContact == null)
                        {
                            response.Title = "Error";
                            response.Message = "Contact Not Found.";
                            response.IsSuccess = false;
                            return response;
                        }
                        if (exContact.RecordStatus == "Deleted")
                        {
                            response.Title = "Error";
                            response.IsSuccess = false;
                            response.Message = "It seems like the contact is deleted";
                            return response;
                        }

                        contact.RecordStatus = "Active";
                        contact.CreatedDate = exContact.CreatedDate;
                        contact.ModifiedDate = DateTime.Now;
                        _context.Contacts.Update(contact);

                        response.Message = "Contact Updated Successfully";
                    }
                    else // insert
                    {
                        bool isAlreadyExists = await _context.Contacts.AsNoTracking().AnyAsync(w => w.Email == contact.Email.Trim());
                        if (isAlreadyExists)
                        {
                            response.Title = "Error";
                            response.Message = "Contact Email Already Exists.";
                            response.IsSuccess = false;
                            return response;
                        }
                        isAlreadyExists = await _context.Contacts.AsNoTracking().AnyAsync(w => w.PhoneNumber == contact.PhoneNumber.Trim());
                        if (isAlreadyExists)
                        {
                            response.Title = "Error";
                            response.Message = "Contact Phone No. Already Exists.";
                            response.IsSuccess = false;
                            return response;
                        }

                        contact.RecordStatus = "Active";
                        contact.CreatedDate = DateTime.Now;
                        contact.ModifiedDate = DateTime.Now;
                        await _context.Contacts.AddAsync(contact);

                        response.Message = "Contact Added Successfully";
                    }
                    await _context.SaveChangesAsync();

                    response.IsSuccess = true;
                    response.Title = "Success";
                }
            }
            catch (Exception ex)
            {
                response.SetContent(false, null, "Error", ex.GetBaseException().ToString());
            }
            return response;
        }
        public async Task<CustomResponse> GetContact(int contactId)
        {
            CustomResponse response = new();
            response.Title = "Error";
            response.IsSuccess = false;
            using (_context)
            {
                var exContact = await _context.Contacts.FirstOrDefaultAsync(f => f.ContactId == contactId);
                if (exContact == null)
                {
                    response.Message = "Contact Not Found.";
                    return response;
                }

                if (exContact.RecordStatus == "Deleted")
                {
                    response.Message = "It seems like the contact is deleted";
                    return response;
                }
                response.IsSuccess = true;
                response.Data = new
                {
                    contact = exContact
                };
            }
            return response;
        }
        public async Task<CustomResponse> DeleteContact(int contactId)
        {
            CustomResponse response = new();
            response.Title = "Error";
            response.IsSuccess = false;
            using (_context)
            {
                var exContact = await _context.Contacts.FirstOrDefaultAsync(f => f.ContactId == contactId);
                if (exContact == null)
                {
                    response.Message = "Contact Not Found.";
                    return response;
                }

                if (exContact.RecordStatus == "Deleted")
                {
                    response.Message = "Record Already Deleted, Kindly Reload the Page.";
                    return response;
                }

                exContact.RecordStatus = "Deleted";
                exContact.ModifiedDate = DateTime.Now;
                await _context.SaveChangesAsync();

                response.IsSuccess = true;
                response.Title = "Success";
                response.Message = "Contact Deleted Successfully";
            }

            return response;
        }

        /* second level validation in service middleware context */
        private CustomResponse ValidateContact(Models.Contact contact)
        {
            CustomResponse res = new();
            res.IsSuccess = false;
            StringBuilder errBuiler = new StringBuilder();
            if (string.IsNullOrEmpty(contact.FirstName))
                errBuiler.AppendLine("First Name is mandatory");

            if (string.IsNullOrEmpty(contact.LastName))
                errBuiler.AppendLine("Last Name is mandatory");

            // email should not be empty at the same time it should be a valid email.
            if (string.IsNullOrEmpty(contact.Email))
            {
                errBuiler.AppendLine("Email is mandatory");
            }
            else
            {
                bool isValid = Regex.IsMatch(contact.Email, email_pattern);
                if (!isValid)
                    errBuiler.AppendLine("Email is not valid.");
            }

            // phone no should not be empty at the same time it should be a valid 10 digit phone no. 
            if (string.IsNullOrEmpty(contact.PhoneNumber))
                errBuiler.AppendLine("Phone Number is mandatory");
            else if (contact.PhoneNumber.Length != 10)
                errBuiler.AppendLine("Phone Number should have 10 digits");
            else
            {
                bool isValid = Regex.IsMatch(contact.PhoneNumber, numeric);
                if (!isValid)
                    errBuiler.AppendLine("Phone Number is not a valid.");
            }

            if (string.IsNullOrEmpty(contact.Address))
                errBuiler.AppendLine("Address is mandatory");

            if (string.IsNullOrEmpty(contact.City))
                errBuiler.AppendLine("City is mandatory");

            if (string.IsNullOrEmpty(contact.State))
                errBuiler.AppendLine("State is mandatory");

            if (string.IsNullOrEmpty(contact.Country))
                errBuiler.AppendLine("Country is mandatory");

            // PostalCode should not be empty at the same time it should be a valid 6 digit PostalCode.    
            if (string.IsNullOrEmpty(contact.PostalCode))
                errBuiler.AppendLine("Postal Code is mandatory");
            else if (contact.PostalCode.Length != 6)
                errBuiler.AppendLine("Postal Code should have 10 digits");
            else
            {
                bool isValid = Regex.IsMatch(contact.PostalCode, numeric);
                if (!isValid)
                    errBuiler.AppendLine("Postal Code is not a valid.");
            }

            res.IsSuccess = !(errBuiler.Length > 0);
            res.Title = "Error";
            res.Message = errBuiler.ToString();
            return res;
        }

    }
}