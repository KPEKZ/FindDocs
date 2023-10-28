namespace FindDox.Models.Map;

public static class DocumentMapper
{
	public static Db.Document ToDbo(this Api.Document document, Db.DocumentType docType) =>
	new()
	{
		Name = document.Name,
		Number = document.Number,
		ReleaseDate = document.ReleaseDate,
		TakeEffectDate = document.TakeEffectDate,
		DocumentType = docType
	};

	public static Api.Document ToApi(this Db.Document document) =>
	new()
	{
		Id = document.Id,
		Name = document.Name,
		Number = document.Number,
		ReleaseDate = document.ReleaseDate,
		TakeEffectDate = document.TakeEffectDate,
		DocumentType = document.DocumentType?.ToApi(),
		Links = document.Links?.Select(x => x.ToApi()).ToList(),
		Keywords = document.Keywords?.Select(x => x.ToApi()).ToList(),
	};

	public static void ToUpdateDbo(this Db.Document document, Api.Document updateDocument) 
	{
		document.Name = updateDocument.Name;
		document.Number = updateDocument.Number;
		document.ReleaseDate = updateDocument.ReleaseDate;
		document.TakeEffectDate = updateDocument.TakeEffectDate;
	}
}
