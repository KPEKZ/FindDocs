using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using FindDox.Models.Api.Request;
using Microsoft.AspNetCore.Mvc;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("Keyword")]
public class KeywordController : ControllerBase
{
	private readonly IKeywordService _keywordService;

	public KeywordController(IKeywordService keywordService)
	{
		_keywordService = keywordService;
	}

	[HttpGet]
	[ProducesResponseType(typeof(Keyword), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _keywordService.Get(id);
		return Ok(result);
	}

	[HttpGet("all")]
	[ProducesResponseType(typeof(Keyword), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAll()
	{
		var result = await _keywordService.GetAll();
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(Keyword), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] AddKeyRequest request)
	{
		var result = await _keywordService.Add(request);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(Keyword), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] Keyword keyword)
	{
		var result = await _keywordService.Update(keyword);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _keywordService.Remove(id);
		return Ok();
	}
}
