namespace FindDox.Models.Api;

public class Document
{
	public Guid Id { get; set; }

	public string Name { get; set; }
	public string Number { get; set; }

	public DateTimeOffset ReleaseDate { get; set; }
	public DateTimeOffset TakeEffectDate { get; set; }


	public DocumentType DocumentType { get; set; }
	public IReadOnlyList<Keyword> Keywords { get; set; }
	public IReadOnlyList<Link> Links { get; set; }
}
