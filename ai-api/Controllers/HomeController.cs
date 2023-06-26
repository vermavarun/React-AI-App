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
    public List<Employee> Get()
    {
       using var db = new EmployeeContext();
         return db.Employees.ToList();
    }

    [HttpPost(Name = "/")]
    public int Post(string employeeName)
    {
        using var db = new EmployeeContext();
        Employee emp = new Employee();
        emp.EmployeeName = employeeName;
        db.Add(emp);
        db.SaveChanges();

       return emp.EmployeeId;
    }
}
