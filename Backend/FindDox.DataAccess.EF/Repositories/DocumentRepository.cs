using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
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
			.Include(x => x.Keywords)
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Документ не найден");
	}

	public async Task<Document> Add(Document document)
	{
		await _dbContext.Documents.AddAsync(document);
		return document;
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
		await _keywordRepository.RemoveRange(id);
		await _documentTypeRepository.Remove(document.DocumentType.Id);

		_dbContext.Documents.Remove(document);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
