namespace FindDox.Models.Api.Request;

public class FindDocumentsRequest
{
	public string Name { get; set; }
	public string Number { get; set; }

	public DateTimeOffset? ReleaseDate { get; set; }
	public DateTimeOffset? TakeEffectDate { get; set; }

	public IReadOnlyList<Guid> DocumentTypeIds { get; set; }
	public IReadOnlyList<Keyword> Keywords { get; set; }
}
