using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class UserRepository : IUserRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public UserRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<User> Get(Guid id)
	{
		return await _dbContext.Users
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Пользователь не найден");
	}

	public async Task<IReadOnlyList<User>> GetAll()
	{
		return await _dbContext.Users.ToListAsync();
	}

	public async Task<IReadOnlyList<UserRole>> GetUsersToRolesByRoleId(Guid id)
	{
		return await _dbContext.UsersToRoles
			.Where(ur => ur.RoleId == id)
			.ToListAsync();
	}

	public async Task<User> Add(User user)
	{
		await _dbContext.Users.AddAsync(user);
		return user;
	}

	public Task Update(User user)
	{
		_dbContext.Users.Update(user);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid id)
	{
		var user = await Get(id);
		var usersToRoles = await GetUsersToRolesByRoleId(id);

		_dbContext.UsersToRoles.RemoveRange(usersToRoles);
		_dbContext.Users.Remove(user);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
