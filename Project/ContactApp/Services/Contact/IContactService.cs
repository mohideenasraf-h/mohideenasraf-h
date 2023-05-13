using System.Threading.Tasks;
using ContactApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactApp.Services.Contact
{
    public interface IContactService
    {
        Task<CustomResponse> GetContactList();
        Task<CustomResponse> CreateUpdateContact(ContactApp.Models.Contact contact);
        Task<CustomResponse> GetContact(int contactId);
        Task<CustomResponse> DeleteContact(int contactId);
         
    }
}