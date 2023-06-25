using Microsoft.AspNetCore.Mvc;

namespace ai_api.Controllers;

[ApiController]
[Route("/")]
public class HomeController : ControllerBase
{

    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "/")]
    public string Get()
    {
       return "Hey from .net!";
    }
}
