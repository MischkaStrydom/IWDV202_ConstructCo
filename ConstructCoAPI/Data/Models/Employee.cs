using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConstructCoAPI.Data.Models
{
  [Table("Employees")]
  [Index(nameof(LastName))]
  [Index(nameof(JobId))]

  public class Employee
  {
    [Key]
    public int EmployeeId { get; set; }

    [Required, Column(TypeName = ("nvarchar")), MaxLength(50)]
    public string LastName { get; set; }

    [Required, Column(TypeName = ("nvarchar")), MaxLength(50)]
    public string FirstName { get; set; }

    [Required, Column(TypeName = ("nvarchar")), MinLength(1), MaxLength(6)]
    public string Initials { get; set; }

    [Required, Column(TypeName = ("datetime2"))]
    public DateTime HiredDate { get; set; }

    [Required]
    [ForeignKey(nameof(Job))]
    public int JobId { get; set; }

    public Job? Job { get; set; } = null!;

    [Required]
    public int YearsOfService { get; set; }

  }//End class Employee
}//Ed namespave ConstructCoAPI.Data.Models
