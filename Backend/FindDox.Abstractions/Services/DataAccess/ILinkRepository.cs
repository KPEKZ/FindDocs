using FindDox.Models.Db;

namespace FindDox.Abstractions.Services.DataAccess;

public interface ILinkRepository
{
	Task<Link> Get(Guid id);
	Task<IReadOnlyList<Link>> GetManyByDocumentId(Guid documentId);

	Task<Link> Add(Link link);

	Task Update(Link link);

	Task Remove(Guid id);
	Task RemoveRange(Guid documentId);

	Task<int> Save(CancellationToken ctx = default);
}

