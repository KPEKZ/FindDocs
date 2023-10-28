using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api.Request;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Document;

public class DocumentService : IDocumentService
{
	protected readonly IDocumentRepository _documentRepository;
	protected readonly IDocumentTypeRepository _documentTypeRepository;
	protected readonly IDocumentTypeService _documentTypeService;
	protected readonly IKeywordService _keywordService;
	protected readonly ILinkService _linkService;

	public DocumentService(IDocumentRepository documentRepository,
		IDocumentTypeRepository documentTypeRepository,
		ILinkService linkService,
		IKeywordService keywordService,
		IDocumentTypeService documentTypeService)
	{
		_documentRepository = documentRepository;
		_documentTypeRepository = documentTypeRepository;
		_linkService = linkService;
		_keywordService = keywordService;
		_documentTypeService = documentTypeService;
	}


	public DocumentService(IDocumentRepository documentRepository,
		IDocumentTypeRepository documentTypeRepository)
	{
		_documentRepository = documentRepository;
		_documentTypeRepository = documentTypeRepository;

	}

	public async Task<Models.Api.Document> Get(Guid id)
	{
		var doc = await _documentRepository.Get(id);
		return doc.ToApi();
	}

	public async Task<IReadOnlyList<Models.Api.Document>> GetAllByFilters(GetAllRequest request)
	{
		var documents = await _documentRepository.GetAllByFilters(request);
		return documents.Select(x => x.ToApi()).ToList();
	}

	public async Task<Models.Api.Document> Add(Models.Api.Document document)
	{
		var docType = await _documentTypeService.Get(document.DocumentType.Id);

		var doc = document.ToDbo();
		doc.DocumentType = docType.ToDbo();

		if (document.Links is not null && document.Links.Any())
		{
			var docLinksT = document.Links.Select(x => _linkService.Get(x.Id));
			var docLinks = await Task.WhenAll(docLinksT);
			doc.Links = docLinks.Select(x => x.ToDbo(doc.Id)).ToList();
		}

		if (document.Keywords is not null && document.Keywords.Any())
		{
			var docKeywordsT = document.Keywords.Select(x => _keywordService.Get(x.Id));
			var docKeywords = await Task.WhenAll(docKeywordsT);
			doc.Keywords = docKeywords.Select(x => x.ToDbo(doc.Id)).ToList();
		}

		var addedDoc = await _documentRepository.Add(doc);
		await _documentRepository.Save();
		return addedDoc.ToApi();
	}

	public async Task<Models.Api.Document> Update(Models.Api.Document document)
	{
		var doc = await _documentRepository.Get(document.Id);
		await _documentTypeService.Update(document.DocumentType);
		document.Keywords?.Select(x => _keywordService.Update(x));
		document.Links?.Select(x => _linkService.Update(x));
		

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
