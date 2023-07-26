using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConstructCoAPI.Data.Models
{
  [Table("Projects")]
  [Index(nameof(Name), IsUnique = true)]
  [Index(nameof(EmployeeId))]

  public class Project
  {
    [Key]
    public int ProjectId { get; set; }

    [Required, MinLength(2), MaxLength(50), Column(TypeName = ("nvarchar"))]
    public string Name { get; set; }

    [Required, Column(TypeName = ("decimal(10,2"))]
    public decimal Value { get; set; }

    [Required, Column(TypeName = ("decimal(10,2"))]
    public decimal Balance { get; set; }

    [Required]
    [ForeignKey(nameof(Employee))]
    public int EmployeeId { get; set; }

    public Employee? Employee { get; set; } = null!;

   

  }//End class Project
}//End namespace ConstructCoAPI.Data.Models
