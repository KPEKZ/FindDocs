using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using FindDox.Models.Api.Request;
using Microsoft.AspNetCore.Mvc;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("Link")]
public class LinkController : ControllerBase
{
	private readonly ILinkService _linkService;

	public LinkController(ILinkService linkService)
	{
		_linkService = linkService;
	}

	[HttpGet]
	[ProducesResponseType(typeof(Link), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _linkService.Get(id);
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(Link), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] AddlinkRequest request)
	{
		var result = await _linkService.Add(request);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(Link), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] Link link)
	{
		var result = await _linkService.Update(link);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _linkService.Remove(id);
		return Ok();
	}
}
