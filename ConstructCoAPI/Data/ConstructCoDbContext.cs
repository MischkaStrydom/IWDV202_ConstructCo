using ConstructCoAPI.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace ConstructCoAPI.Data
{
  public class ConstructCoDbContext : DbContext
  {
    public ConstructCoDbContext() : base()
    { }

    public ConstructCoDbContext(DbContextOptions options)
        : base(options)
    { }



    public DbSet<Assignment> Assignments => Set<Assignment>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Job> Jobs => Set<Job>();

  }//End class ConstructCoDbContext
}//End namespace ConstructCoAPI.Data
