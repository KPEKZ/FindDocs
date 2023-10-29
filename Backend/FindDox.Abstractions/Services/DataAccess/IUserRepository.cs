using FindDox.Models.Api.Request;
using FindDox.Models.Db;
using System.Collections.Generic;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IUserRepository
{
	Task<User> Get(Guid id);
	Task<IReadOnlyList<User>> GetAll();

	Task<User> Add(User user);
	Task AddRole(Guid roleId, Guid userId);

	Task Update(User user);

	Task Remove(Guid id);

	Task<int> Save(CancellationToken ctx = default);
}
