using FindDox.Models.Api.Request;
using FindDox.Models.Db;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IDocumentRepository
{
	Task<Document> Get(Guid id);
	Task<IReadOnlyList<Document>> GetAllByFilters(GetAllRequest request);

	Task<Document> Add(Document document);

	Task Update(Document document);

	Task Remove(Guid id);

	Task<int> Save(CancellationToken ctx = default);
}


