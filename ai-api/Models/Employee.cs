using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class EmployeeContext : DbContext
{

    public DbSet<Employee> Posts { get; set; }

    public string DbPath { get; }

    public EmployeeContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "employee.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class Employee
{
    public int EmployeeId { get; set; }
    public string? EmployeeName { get; set; }

}
