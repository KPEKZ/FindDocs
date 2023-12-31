﻿using FindDox.Models.Api;
using FindDox.Models.Api.Request;

namespace FindDox.Abstractions.Services.Domain;

public interface IKeywordService
{
	Task<Keyword> Get(Guid id);
	Task<IReadOnlyList<Keyword>> GetMany(IReadOnlyList<Guid> ids);
	Task<IReadOnlyList<Keyword>> GetAll();

	Task<Keyword> Add(AddKeyRequest request);

	Task<Keyword> Update(Keyword keyword);

	Task Remove(Guid id);
}

