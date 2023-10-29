using FindDox.Models.Api.Request;
using FindDox.Models.Db;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IDocumentRepository
{
	Task<Document> Get(Guid id);
	Task<IReadOnlyList<Document>> GetAllByFilters(GetAllRequest request);

	Task<Document> Add(Document document);
	Task<IReadOnlyList<KeywordDocument>> AddKeywords(IReadOnlyList<Guid> ids, Guid docId);

	Task Update(Document document);

	Task Remove(Guid id);
	Task RemoveKeywords(IReadOnlyList<Guid> ids, Guid docId);

	Task<IReadOnlyList<Document>> Search(string name);

	Task<int> Save(CancellationToken ctx = default);
}


