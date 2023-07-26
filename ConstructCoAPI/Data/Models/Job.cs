using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace ConstructCoAPI.Data.Models
{
  [Table("Jobs")]
  [Index(nameof(Description), IsUnique = true)]

  public class Job
  {
    [Key]
    public int JobId { get; set; }

    [Required, MinLength(2), MaxLength(50), Column(TypeName = ("nvarchar"))]
    public string Description { get; set; }

    [Required, Column(TypeName = ("decimal(5,2)"))]
    public decimal HourCharge { get; set; }

    [Required, Column(TypeName = ("datetime2"))]

    

    public DateTime LastUpdated { get; set; }

    public ICollection<Employee>? Employees { get; set; } = null!;
   

  }//End class Job
}//End class ConstructCoAPI.Data.Models
