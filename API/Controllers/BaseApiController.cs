using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]       //controller is the base holder for the name of the controller
    [ApiController]
    public class BaseApiController : ControllerBase
    {
    }
}
