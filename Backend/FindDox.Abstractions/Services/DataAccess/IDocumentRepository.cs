using FindDox.Models.Db;
using System.Collections.Generic;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IDocumentRepository
{
	Task<Document> Get(Guid id);
	Task<IReadOnlyList<Document>> GetAll();

	Task<Document> Add(Document document);

	Task Update(Document document);

	Task Remove(Guid id);

	Task<int> Save(CancellationToken ctx = default);
}


