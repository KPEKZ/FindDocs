using FindDox.Models.Api;
using FindDox.Models.Api.Request;

namespace FindDox.Abstractions.Services.Domain;

public interface IKeywordService
{
	Task<Keyword> Get(Guid id);

	Task<Keyword> Add(AddKeyRequest request);

	Task<Keyword> Update(Keyword keyword);

	Task Remove(Guid id);
}

