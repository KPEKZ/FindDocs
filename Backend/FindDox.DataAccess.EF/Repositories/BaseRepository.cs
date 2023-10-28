using FindDox.Abstractions.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class BaseRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public BaseRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task Save()
	{
		await _dbContext.SaveChangesAsync();
	}

	public void Add<T>(T item)
		where T : class
	{
		_dbContext.Add(item);
		_dbContext.Entry(item).State = EntityState.Added;
	}

	public void Update<T>(T item)
		where T : class
	{
		_dbContext.Attach(item);
		_dbContext.Entry(item).State = EntityState.Modified;
		_dbContext.Update(item);
	}
}
