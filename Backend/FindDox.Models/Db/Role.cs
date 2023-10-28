using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class Role
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	public string Name { get; set; }

	[InverseProperty(nameof(UserRole.Role))]
	public ICollection<UserRole> RoleUsers { get; set; }
}
