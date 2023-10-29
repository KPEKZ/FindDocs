namespace FindDox.Models.Api;

public class User
{
	public Guid Id { get; set; }

	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string Nickname { get; set; }
	public string Email { get; set; }

	public ICollection<Role> UserRoles { get; set; }
}
