using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Api.Request;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class DocumentRepository : IDocumentRepository
{
	protected readonly IFindBoxDbContext _dbContext;
	protected readonly IDocumentTypeRepository _documentTypeRepository;
	protected readonly IKeywordRepository _keywordRepository;
	protected readonly ILinkRepository _linkRepository;

	public DocumentRepository(
		IFindBoxDbContext dbContext,
		IDocumentTypeRepository documentTypeRepository,
		IKeywordRepository keywordRepository,
		ILinkRepository linkRepository
		)
	{
		_dbContext = dbContext;
		_documentTypeRepository = documentTypeRepository;
		_keywordRepository = keywordRepository;
		_linkRepository = linkRepository;
	}

	public async Task<Document> Get(Guid id)
	{
		return await _dbContext.Documents
			.Include(x => x.Links)
			.Include(x => x.DocumentType)
			.Include(x => x.DocumentKeywords)
				.ThenInclude(x => x.Keyword)
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Документ не найден");
	}

	public async Task<IReadOnlyList<Document>> GetAllByFilters(GetAllRequest request)
	{
		IQueryable<Document> documents = _dbContext.Documents;

		if (request.KeywordIds is not null && request.KeywordIds.Any())
		{
			documents = documents.Where(d => d.DocumentKeywords.Select(x => x.Keyword).Any(x => request.KeywordIds.Contains(x.Id)));
		}
		if (request.DocumentTypeIds is not null && request.DocumentTypeIds.Any())
		{
			documents = documents.Where(d => request.DocumentTypeIds.Contains(d.DocumentTypeId));
		}
		if (request.From.HasValue)
		{
			documents = documents.Where(d => d.ReleaseDate.DateTime > request.From);
		}
		if (request.To.HasValue)
		{
			documents = documents.Where(d => d.ReleaseDate.DateTime < request.To);
		}

		return await documents
			.Include(x => x.Links)
			.Include(x => x.DocumentType)
			.Include(x => x.DocumentKeywords)
				.ThenInclude(x => x.Keyword)
			.ToListAsync();
	}

	public async Task<Document> Add(Document document)
	{
		await _dbContext.Documents.AddAsync(document);
		return document;
	}

	public async Task<IReadOnlyList<KeywordDocument>> AddKeywords(IReadOnlyList<Guid> ids, Guid docId)
	{
		var documentKeywords = ids.Select(x =>
			new KeywordDocument
			{
				KeywordId = x,
				DocumentId = docId
			});
		await _dbContext.KeywordDocument.AddRangeAsync(documentKeywords);

		return documentKeywords.ToList();
	}

	public Task Update(Document document)
	{
		_dbContext.Documents.Update(document);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid id)
	{
		var document = await Get(id);

		await _linkRepository.RemoveRange(id);

		_dbContext.Documents.Remove(document);
	}

	public Task RemoveKeywords(IReadOnlyList<Guid> ids, Guid docId)
	{
		_dbContext.KeywordDocument.Where(x => x.DocumentId.Equals(docId) && ids.Contains(x.KeywordId));

		return Task.CompletedTask;
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
