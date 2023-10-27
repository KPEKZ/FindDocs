using FindDox.Models.Db;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IKeywordRepository
{
	Task<Keyword> Get(Guid id);
	Task<IReadOnlyList<Keyword>> GetManyByDocumentId(Guid documentId);

	Task<Keyword> Add(Keyword keyword);

	Task Update(Keyword keyword);

	Task Remove(Guid id);
	Task RemoveRange(Guid documentId);

	Task<int> Save(CancellationToken ctx = default);
}

