using FindDox.Models.Api;

namespace FindDox.Abstractions.Services.Domain;

public interface IRoleService
{
	Task<Role> Get(Guid id);
	Task<IReadOnlyList<Role>> GetAll();

	Task<Role> Add(Role role);

	Task<Role> Update(Role role);

	Task Remove(Guid id);
}
