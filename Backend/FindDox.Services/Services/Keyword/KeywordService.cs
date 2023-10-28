using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api.Request;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Keyword;

public class KeywordService : IKeywordService
{
	protected readonly IKeywordRepository _keywordRepository;

	public KeywordService(IKeywordRepository keywordRepository)
	{
		_keywordRepository = keywordRepository;
	}

	public async Task<Models.Api.Keyword> Get(Guid id)
	{
		var docType = await _keywordRepository.Get(id);
		return docType.ToApi();
	}

	public async Task<Models.Api.Keyword> Add(AddKeyRequest request)
	{
		var key = request.Keyword.ToDbo(request.DocumentId);

		var addedKey = await _keywordRepository.Add(key);
		await _keywordRepository.Save();

		return addedKey.ToApi();
	}

	public async Task<Models.Api.Keyword> Update(Models.Api.Keyword keyword)
	{
		var key = await _keywordRepository.Get(keyword.Id);

		key.ToUpdateDbo(keyword);

		await _keywordRepository.Update(key);
		await _keywordRepository.Save();

		return key.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _keywordRepository.Remove(id);
		await _keywordRepository.Save();
	}
}
