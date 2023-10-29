namespace FindDox.Models.Map;

public static class KeywordMapper
{
	public static Db.Keyword ToDbo(this Api.Keyword keyword) =>
	new()
	{
		Name = keyword.Name
	};

	public static Api.Keyword ToApi(this Db.Keyword keyword) =>
	new()
	{
		Id = keyword.Id,
		Name = keyword.Name,
	};

	public static void ToUpdateDbo(this Db.Keyword keyword, Api.Keyword updateKeyword)
	{
		keyword.Name = updateKeyword.Name;
	}
}
