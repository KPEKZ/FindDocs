using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using Microsoft.AspNetCore.Mvc;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("Role")]
public class RoleController : ControllerBase
{
	private readonly IRoleService _roleService;

	public RoleController(IRoleService roleService)
	{
		_roleService = roleService;
	}

	[HttpGet]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _roleService.Get(id);
		return Ok(result);
	}

	[HttpGet("all")]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAll()
	{
		var result = await _roleService.GetAll();
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] Role role)
	{
		var result = await _roleService.Add(role);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] Role role)
	{
		var result = await _roleService.Update(role);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _roleService.Remove(id);
		return Ok();
	}
}
