using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class RoleRepository : IRoleRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public RoleRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<Role> Get(Guid id)
	{
		return await _dbContext.Roles
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Роль не найдена");
	}

	public async Task<IReadOnlyList<Role>> GetAll()
	{
		return await _dbContext.Roles.ToListAsync();
	}

	public async Task<IReadOnlyList<UserRole>> GetUsersToRolesByRoleId(Guid id)
	{
		return await _dbContext.UsersToRoles
			.Where(ur => ur.RoleId == id)
			.ToListAsync();
	}

	public async Task<Role> Add(Role role)
	{
		await _dbContext.Roles.AddAsync(role);
		return role;
	}

	public Task Update(Role role)
	{
		_dbContext.Roles.Update(role);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid id)
	{
		var role = await Get(id);
		var usersToRoles = await GetUsersToRolesByRoleId(id);

		_dbContext.UsersToRoles.RemoveRange(usersToRoles);
		_dbContext.Roles.Remove(role);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
