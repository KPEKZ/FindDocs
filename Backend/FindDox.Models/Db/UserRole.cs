using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class UserRole
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();


	public Guid UserId { get; set; }
	public Guid RoleId { get; set; }


	[ForeignKey(nameof(UserId))]
	public User User { get; set; }

	[ForeignKey(nameof(RoleId))]
	public Role Role { get; set; }
}
