using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ConstructCoAPI.Data.Models
{
  [Table("Assignments")]
  [Index(nameof(ProjectId))]
  [Index(nameof(EmployeeId))]
  public class Assignment
  {
    [Key]
    public int AssignmentId { get; set; }

    [Required, Column(TypeName = ("datetime2"))]
    public DateTime AssignDate { get; set; }


 
    [Required]
    [ForeignKey(nameof(Project))]
    public int ProjectId { get; set; }
    public Project? Project { get; set; } = null!;

    [Required]
    [ForeignKey(nameof(Employee))]
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; } = null!;

    [Required]
    public int AssignJobId { get; set; }

    [Required, Column(TypeName = "decimal(5,2)")]
    public decimal AssignHourCharge { get; set; }

    [Required, Column(TypeName = "decimal(5,2)")]
    public decimal Hours { get; set; }

    [Required, Column(TypeName = "decimal(5,2)")]
    public decimal Charge { get; set; }
  }//End class Assignment
}//End namespace ConstructCoAPI.Data.Models
