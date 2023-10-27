using FindDox.Models.Api;

namespace FindDox.Abstractions.Services.Domain;

public interface IDocumentService
{
	Task<Document> Get(Guid id);

	Task<Document> Add(Document document);

	Task<Document> Update(Document document);

	Task Remove(Guid id);
}


