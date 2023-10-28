using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class KeywordRepository : IKeywordRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public KeywordRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<Keyword> Get(Guid id)
	{
		return await _dbContext.Keywords
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Ключевое слово не найдено");
	}


	public async Task<IReadOnlyList<Keyword>> GetAll()
	{
		return await _dbContext.Keywords.ToListAsync();
	}

	public async Task<IReadOnlyList<Keyword>> GetManyByDocumentId(Guid documentId)
	{
		return await _dbContext.Keywords
				.Where(x => x.DocumentId.Equals(documentId))
				.ToListAsync();
	}

	public async Task<Keyword> Add(Keyword keyword)
	{
		await _dbContext.Keywords.AddAsync(keyword);
		return keyword;
	}

	public Task Update(Keyword keyword)
	{
		_dbContext.Keywords.Update(keyword);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid id)
	{
		var keyword = await Get(id);

		_dbContext.Keywords.Remove(keyword);
	}

	public async Task RemoveRange(Guid documentId)
	{
		var keywords = await GetManyByDocumentId(documentId);
		_dbContext.Keywords.RemoveRange(keywords);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
