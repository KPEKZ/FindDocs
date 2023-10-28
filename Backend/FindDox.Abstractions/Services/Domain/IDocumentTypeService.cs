using FindDox.Models.Api;

namespace FindDox.Abstractions.Services.Domain;

public interface IDocumentTypeService
{
	Task<DocumentType> Get(Guid id);

	Task<DocumentType> Add(DocumentType document);

	Task<DocumentType> Update(DocumentType document);

	Task Remove(Guid documentTypeId);
}


