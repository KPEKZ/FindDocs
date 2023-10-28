namespace FindDox.Models.Map;

public static class RoleMapper
{
	public static Db.Role ToDbo(this Api.Role role) =>
	new()
	{
		Name = role.Name
	};

	public static Api.Role ToApi(this Db.Role role) =>
	new()
	{
		Id = role.Id,
		Name = role.Name
	};

	public static void ToUpdateDbo(this Db.Role role, Api.Role updateRole)
	{
		role.Name = updateRole.Name;
	}
}
