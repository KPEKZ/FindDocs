using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api.Request;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Document;

public class DocumentService : IDocumentService
{
	protected readonly IDocumentRepository _documentRepository;
	protected readonly IDocumentTypeRepository _documentTypeRepository;
	protected readonly IKeywordRepository _keywordRepository;
	protected readonly ILinkRepository _linkRepository;


	protected readonly IDocumentTypeService _documentTypeService;
	protected readonly IKeywordService _keywordService;
	protected readonly ILinkService _linkService;

	public DocumentService(IDocumentRepository documentRepository,
		IDocumentTypeRepository documentTypeRepository,
		ILinkService linkService,
		IKeywordService keywordService,
		IDocumentTypeService documentTypeService,
		IKeywordRepository keywordRepository,
		ILinkRepository linkRepository)
	{
		_documentRepository = documentRepository;
		_documentTypeRepository = documentTypeRepository;
		_linkService = linkService;
		_keywordService = keywordService;
		_documentTypeService = documentTypeService;
		_keywordRepository = keywordRepository;
		_linkRepository = linkRepository;
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
		var doc = document.ToDbo();

		if (document.DocumentType is not null)
		{
			var docType = await _documentTypeRepository.Get(document.DocumentType.Id);
			doc.DocumentType = docType;
		}

		if (document.Links is not null && document.Links.Any())
		{
			doc.Links = document.Links.Select(x => x.ToDbo(doc.Id)).ToList();
		}

		if (document.Keywords is not null && document.Keywords.Any())
		{
			var keywords = await _keywordRepository.GetMany(document.Keywords.Select(x => x.Id).ToList());
			var addedKeywords = await _documentRepository.AddKeywords(keywords.Select(x => x.Id).ToList(), doc.Id);
		}

		var addedDoc = await _documentRepository.Add(doc);
		await _documentRepository.Save();

		return addedDoc.ToApi();
	}

	public async Task<Models.Api.Document> Update(Models.Api.Document document)
	{
		var doc = await _documentRepository.Get(document.Id);

		doc.DocumentType = document.DocumentType.ToDbo();

		if (document.Keywords is not null && document.Keywords.Any())
		{
			await _documentRepository.RemoveKeywords(doc.DocumentKeywords.Select(x => x.KeywordId).ToList(), doc.Id);

			var addedKeywords = await _documentRepository.AddKeywords(document.Keywords.Select(x => x.Id).ToList(), doc.Id);
			doc.DocumentKeywords = addedKeywords.ToList();
		}

		if (document.Links is not null && document.Links.Any())
			doc.Links = document.Links.Select(x => x.ToDbo(doc.Id)).ToList();

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

	public async Task<IReadOnlyList<Models.Api.Document>> Search(string name, string number)
	{
		var documents = await _documentRepository.Search(name, number);

		return documents.Select(x => x.ToApi()).ToList();
	}
}
