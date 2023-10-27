using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using Microsoft.AspNetCore.Mvc;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("Document")]
public class DocumentController : ControllerBase
{
	private readonly IDocumentService _documentService;

	public DocumentController(IDocumentService documentService)
	{
		_documentService = documentService;
	}

	[HttpGet]
	[ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _documentService.Get(id);
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] Document document)
	{
		var result = await _documentService.Add(document);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] Document document)
	{
		var result = await _documentService.Update(document);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _documentService.Remove(id);
		return Ok();
	}
}
