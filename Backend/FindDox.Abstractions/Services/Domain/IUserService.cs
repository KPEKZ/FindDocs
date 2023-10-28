using FindDox.Models.Api;

namespace FindDox.Abstractions.Services.Domain;

public interface IUserService
{
	Task<User> Get(Guid id);
	Task<IReadOnlyList<User>> GetAll();

	Task<User> Add(User user);

	Task<User> Update(User user);

	Task Remove(Guid id);
}
