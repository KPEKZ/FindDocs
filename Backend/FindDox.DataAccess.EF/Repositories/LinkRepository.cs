using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class LinkRepository : ILinkRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public LinkRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<Link> Get(Guid id)
	{
		return await _dbContext.Links
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Ссылка не найдена");
	}

	public async Task<IReadOnlyList<Link>> GetMany(IReadOnlyList<Guid> ids)
	{
		return await _dbContext.Links.Where(x => ids.Contains(x.Id)).ToListAsync();
	}

	public async Task<IReadOnlyList<Link>> GetManyByDocumentId(Guid documentId)
	{
		return await _dbContext.Links
			.Where(x => x.DocumentId.Equals(documentId))
			.ToListAsync();
	}

	public async Task<Link> Add(Link link)
	{
		await _dbContext.Links.AddAsync(link);
		return link;
	}

	public Task Update(Link link)
	{
		_dbContext.Links.Update(link);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid id)
	{
		var link = await Get(id);

		_dbContext.Links.Remove(link);
	}

	public async Task RemoveRange(Guid documentId)
	{
		var links = await GetManyByDocumentId(documentId);
		_dbContext.Links.RemoveRange(links);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
