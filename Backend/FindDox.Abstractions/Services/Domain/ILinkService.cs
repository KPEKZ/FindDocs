﻿using FindDox.Models.Api;
using FindDox.Models.Api.Request;

namespace FindDox.Abstractions.Services.Domain;

public interface ILinkService
{
	Task<Link> Get(Guid id);
	Task<IReadOnlyList<Link>> GetMany(IReadOnlyList<Guid> ids);

	Task<Link> Add(AddlinkRequest request);

	Task<Link> Update(Link link);

	Task Remove(Guid id);
}

