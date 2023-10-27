namespace FindDox.Models.Api.Request;

public class AddKeyRequest
{
	public Guid DocumentId { get; set; }
	public Keyword Keyword { get; set; }
}
