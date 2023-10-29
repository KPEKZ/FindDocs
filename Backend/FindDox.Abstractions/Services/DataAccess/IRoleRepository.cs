using FindDox.Models.Api.Request;
using FindDox.Models.Db;
using System.Collections.Generic;

namespace FindDox.Abstractions.Services.DataAccess;

public interface IRoleRepository
{
	Task<Role> Get(Guid id);
	Task<IReadOnlyList<Role>> GetAll();
	Task<IReadOnlyList<UserRole>> GetUsersToRolesByRoleId(Guid id);

	Task<Role> Add(Role role);

	Task Update(Role role);

	Task Remove(Guid id);

	Task<int> Save(CancellationToken ctx = default);
}
