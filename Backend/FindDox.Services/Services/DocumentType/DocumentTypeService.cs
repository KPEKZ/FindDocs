using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Map;

namespace FindDox.Services.Services.DocumentType;

public class DocumentTypeService : IDocumentTypeService
{
	protected readonly IDocumentTypeRepository _documentTypeRepository;

	public DocumentTypeService(IDocumentTypeRepository documentTypeRepository)
	{
		_documentTypeRepository = documentTypeRepository;
	}

	public async Task<Models.Api.DocumentType> Get(Guid id)
	{
		var docType = await _documentTypeRepository.Get(id);
		return docType.ToApi();
	}

	public async Task<IReadOnlyList<Models.Api.DocumentType>> GetAll()
	{
		var docTypes = await _documentTypeRepository.GetAll();
		return docTypes.Select(x => x.ToApi()).ToList();
	}

	public async Task<Models.Api.DocumentType> Add(Models.Api.DocumentType documentType)
	{
		var doc = documentType.ToDbo();

		var addedDoc = await _documentTypeRepository.Add(doc);
		await _documentTypeRepository.Save();

		return addedDoc.ToApi();
	}

	public async Task<Models.Api.DocumentType> Update(Models.Api.DocumentType document)
	{
		var docType = await _documentTypeRepository.Get(document.Id);

		docType.ToUpdateDbo(document);

		await _documentTypeRepository.Update(docType);
		await _documentTypeRepository.Save();

		return docType.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _documentTypeRepository.Remove(id);
		await _documentTypeRepository.Save();
	}
}
