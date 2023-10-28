using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class User
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string Nickname { get; set; }
	public string Email { get; set; }
	public string Password { get; set; }

	[InverseProperty(nameof(UserRole.User))]
	public ICollection<UserRole> UserRoles { get; set; }
}
