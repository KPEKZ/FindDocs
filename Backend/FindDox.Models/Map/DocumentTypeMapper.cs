namespace FindDox.Models.Map;

public static class DocumentTypeMapper
{
	public static Db.DocumentType ToDbo(this Api.DocumentType document) =>
	new()
	{
		Name = document.Name,
	};

	public static Api.DocumentType ToApi(this Db.DocumentType document) =>
	new()
	{
		Id = document.Id,
		Name = document.Name,
	};

	public static void ToUpdateDbo(this Db.DocumentType documentType, Api.DocumentType updateDocumentType)
	{
		documentType.Name = updateDocumentType.Name;
	}
}
