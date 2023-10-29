namespace FindDox.Models.Api.Request;

public class AddlinkRequest
{
	public Guid DocumentId { get; set; }
	public Link Link { get; set; }
}
