using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Map;

namespace FindDox.Services.Services.User;

public class UserService : IUserService
{
	protected readonly IUserRepository _userRepository;

	public UserService(IUserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	public async Task<Models.Api.User> Get(Guid id)
	{
		var role = await _userRepository.Get(id);
		return role.ToApi();
	}

	public async Task<IReadOnlyList<Models.Api.User>> GetAll()
	{
		var users = await _userRepository.GetAll();
		return users.Select(x => x.ToApi()).ToList();
	}

	public async Task<Models.Api.User> Add(Models.Api.User user)
	{
		var addedDoc = await _userRepository.Add(user.ToDbo());
		await _userRepository.Save();

		return addedDoc.ToApi();
	}

	public async Task<Models.Api.User> Update(Models.Api.User user)
	{
		var u = await _userRepository.Get(user.Id);

		u.ToUpdateDbo(user);

		await _userRepository.Update(u);
		await _userRepository.Save();

		return u.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _userRepository.Remove(id);
		await _userRepository.Save();
	}
}
