using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class UserRepository : IUserRepository
{
	protected readonly IFindBoxDbContext _dbContext;
	protected readonly IRoleRepository _roleRepository;

	public UserRepository(IFindBoxDbContext dbContext, IRoleRepository roleRepository)
	{
		_dbContext = dbContext;
		_roleRepository = roleRepository;
	}

	public async Task<User> Get(Guid id)
	{
		return await _dbContext.Users
			.Include(x => x.UserRoles)
				.ThenInclude(x => x.Role)
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Пользователь не найден");
	}

	public async Task<IReadOnlyList<User>> GetAll()
	{
		return await _dbContext.Users
			.Include(x => x.UserRoles)
				.ThenInclude(x => x.Role)
			.ToListAsync();
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

	public async Task AddRole(Guid roleId, Guid userId)
	{
		await Get(userId);
		await _roleRepository.Get(roleId);
		var userToRole = new UserRole
		{
			RoleId = roleId,
			UserId = userId
		};

		_dbContext.UsersToRoles.Add(userToRole);
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
