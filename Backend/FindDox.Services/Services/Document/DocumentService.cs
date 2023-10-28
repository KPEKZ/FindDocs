using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Document;

public class DocumentService : IDocumentService
{
	protected readonly IDocumentRepository _documentRepository;

	public DocumentService(IDocumentRepository documentRepository)
	{
		_documentRepository = documentRepository;
	}

	public async Task<Models.Api.Document> Get(Guid id)
	{
		var doc = await _documentRepository.Get(id);
		return doc.ToApi();
	}

	public Task<IReadOnlyList<Models.Api.Document>> GetAll()
	{
		throw new NotImplementedException();
	}

	public async Task<Models.Api.Document> Add(Models.Api.Document document)
	{
		var doc = document.ToDbo();
		doc.Keywords = document.Keywords.Select(x => x.ToDbo(doc.Id)).ToList();
		doc.Links = document.Links.Select(x => x.ToDbo(doc.Id)).ToList();

		var addedDoc = await _documentRepository.Add(doc);
		await _documentRepository.Save();
		return addedDoc.ToApi();
	}

	public async Task<Models.Api.Document> Update(Models.Api.Document document)
	{
		var doc = await _documentRepository.Get(document.Id);

		doc.ToUpdateDbo(document);

		await _documentRepository.Update(doc);
		await _documentRepository.Save();

		return doc.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _documentRepository.Remove(id);
		await _documentRepository.Save();
	}
}
