using FindDox.Models.Api;
using FindDox.Models.Api.Request;

namespace FindDox.Abstractions.Services.Domain;

public interface IDocumentService
{
	Task<Document> Get(Guid id);
	Task<IReadOnlyList<Document>> GetAllByFilters(GetAllRequest request);


	Task<Document> Add(Document document);

	Task<Document> Update(Document document);

	Task Remove(Guid id);

	Task<IReadOnlyList<Document>> Search(string name, string number);
}


