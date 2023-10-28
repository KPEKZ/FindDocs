
using FindDox.Models.Api.Request;
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


	Task<IReadOnlyList<Document>> FindByDocumentTypes(IReadOnlyList<Guid> documentTypeIds);
	Task<IReadOnlyList<Document>> FindByName(string name);
	Task<IReadOnlyList<Document>> FindByNumber(string number);
	Task<IReadOnlyList<Document>> FindByKeywords(IReadOnlyList<string> keywords);

	Task<int> Save(CancellationToken ctx = default);
}


