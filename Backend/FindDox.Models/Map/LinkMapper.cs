namespace FindDox.Models.Map;

public static class LinkMapper
{
	public static Db.Link ToDbo(this Api.Link link, Guid documentId) =>
	new()
	{
		Url = link.Url,
		DocumentId = documentId,
	};

	public static Api.Link ToApi(this Db.Link link) =>
	new()
	{
		Id = link.Id,
		Url = link.Url
	};

	public static void ToUpdateDbo(this Db.Link link, Api.Link updateLink)
	{
		link.Url = updateLink.Url;
	}
}
