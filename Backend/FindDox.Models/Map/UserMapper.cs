namespace FindDox.Models.Map;

public static class UserMapper
{
	public static Db.User ToDbo(this Api.User user) =>
	new()
	{
		FirstName = user.FirstName,
		LastName = user.LastName,
		Nickname = user.Nickname,
		Email = user.Email,
	};

	public static Api.User ToApi(this Db.User user) =>
	new()
	{
		FirstName = user.FirstName,
		LastName = user.LastName,
		Nickname = user.Nickname,
		Email = user.Email,
	};

	public static void ToUpdateDbo(this Db.User user, Api.User updateUser)
	{
		user.FirstName = updateUser.FirstName;
		user.LastName = updateUser.LastName;
		user.Nickname = updateUser.Nickname;
		user.Email = updateUser.Email;
	}
}
