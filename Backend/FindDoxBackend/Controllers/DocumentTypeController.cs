using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using Microsoft.AspNetCore.Mvc;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("DocumentType")]
public class DocumentTypeController : ControllerBase
{
	private readonly IDocumentTypeService _documentTypeService;

	public DocumentTypeController(IDocumentTypeService documentTypeService)
	{
		_documentTypeService = documentTypeService;
	}

	[HttpGet]
	[ProducesResponseType(typeof(DocumentType), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _documentTypeService.Get(id);
		return Ok(result);
	}

	[HttpGet("all")]
	[ProducesResponseType(typeof(DocumentType), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAll()
	{
		var result = await _documentTypeService.GetAll();
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(DocumentType), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] DocumentType documentType)
	{
		var result = await _documentTypeService.Add(documentType);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(DocumentType), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] DocumentType documentType)
	{
		var result = await _documentTypeService.Update(documentType);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _documentTypeService.Remove(id);
		return Ok();
	}
}
