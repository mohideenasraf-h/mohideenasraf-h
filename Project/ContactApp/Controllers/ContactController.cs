using System.Threading.Tasks;
using ContactApp.Services.Contact;
using Microsoft.AspNetCore.Mvc;

namespace ContactApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost("CreateUpdateContact")]
        public async Task<IActionResult> CreateUpdateContact([FromBody] Models.Contact contact)
        {
            return Ok(await _contactService.CreateUpdateContact(contact));
        }

        [HttpGet("GetContactList")]
        public async Task<IActionResult> GetContactList()
        {
            return Ok(await _contactService.GetContactList());
        }

        [HttpDelete("DeleteContact/{contactID}")]
        public async Task<IActionResult> DeleteContact(int contactID)
        {
            return Ok(await _contactService.DeleteContact(contactID));
        }

        [HttpGet("GetContact/{contactID}")]
        public async Task<IActionResult> GetContact(int contactID)
        {
            return Ok(await _contactService.GetContact(contactID));
        }
    }
}