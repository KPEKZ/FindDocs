using FindDox.Models.Db;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IDocumentTypeRepository
{
	Task<DocumentType> Get(Guid id);

	Task<DocumentType> Add(DocumentType document);

	Task Update(DocumentType document);

	Task Remove(Guid documentTypeId);

	Task<int> Save(CancellationToken ctx = default);
}


