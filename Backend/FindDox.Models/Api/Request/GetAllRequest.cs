namespace FindDox.Models.Api.Request;

public class GetAllRequest
{
	public IReadOnlyList<Guid> DocumentTypeIds { get;  set; }
	public IReadOnlyList<Guid> KeywordIds { get;  set; }

	public DateTimeOffset? From { get; set; }
	public DateTimeOffset? To { get; set; }
}
