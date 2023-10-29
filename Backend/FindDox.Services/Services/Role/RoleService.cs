using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api.Request;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Role;

public class RoleService : IRoleService
{
	protected readonly IRoleRepository _roleRepository;

	public RoleService(IRoleRepository roleRepository)
	{
		_roleRepository = roleRepository;
	}

	public async Task<Models.Api.Role> Get(Guid id)
	{
		var role = await _roleRepository.Get(id);
		return role.ToApi();
	}

	public async Task<IReadOnlyList<Models.Api.Role>> GetAll()
	{
		var roles = await _roleRepository.GetAll();
		return roles.Select(x => x.ToApi()).ToList();
	}

	public async Task<Models.Api.Role> Add(Models.Api.Role role)
	{
		var addedDoc = await _roleRepository.Add(role.ToDbo());
		await _roleRepository.Save();

		return addedDoc.ToApi();
	}

	public async Task<Models.Api.Role> Update(Models.Api.Role role)
	{
		var r = await _roleRepository.Get(role.Id);

		r.ToUpdateDbo(role);

		await _roleRepository.Update(r);
		await _roleRepository.Save();

		return r.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _roleRepository.Remove(id);
		await _roleRepository.Save();
	}
}
