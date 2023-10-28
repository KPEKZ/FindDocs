using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api.Request;
using FindDox.Models.Map;

namespace FindDox.Services.Services.Link;

public class LinkService : ILinkService
{
	protected readonly ILinkRepository _linkRepository;

	public LinkService(ILinkRepository linkRepository)
	{
		_linkRepository = linkRepository;
	}

	public async Task<Models.Api.Link> Get(Guid id)
	{
		var link = await _linkRepository.Get(id);
		return link.ToApi();
	}

	public async Task<Models.Api.Link> Add(AddlinkRequest request)
	{
		var link = request.Link.ToDbo(request.DocumentId);

		var addedLink = await _linkRepository.Add(link);
		await _linkRepository.Save();

		return addedLink.ToApi();
	}

	public async Task<Models.Api.Link> Update(Models.Api.Link link)
	{
		var l = await _linkRepository.Get(link.Id);

		l.ToUpdateDbo(link);

		await _linkRepository.Update(l);
		await _linkRepository.Save();

		return l.ToApi();
	}

	public async Task Remove(Guid id)
	{
		await _linkRepository.Remove(id);
		await _linkRepository.Save();
	}
}
