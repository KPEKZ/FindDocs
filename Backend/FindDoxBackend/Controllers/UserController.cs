using FindDox.Abstractions.Auth;
using FindDox.Abstractions.Services.Domain;
using FindDox.Models.Api;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FindDox.Api.Controllers;

[Produces("application/json")]
[Route("User")]
public class UserController : ControllerBase
{
	private readonly IUserService _userService;
	private readonly IJwtTokenManager _jwtTokenManager;

	public UserController(IUserService userService, IJwtTokenManager jwtTokenManager)
	{
		_userService = userService;
		_jwtTokenManager = jwtTokenManager;
	}

	private async Task<IActionResult> Authenticate(string id)
	{
		var user = await _userService.Get(Guid.Parse(id));
		if (user == null) return Unauthorized();

		var token = _jwtTokenManager.GenerateToken(user.Id, user.Nickname);

		return Ok(token);
	}

	[HttpGet("authenticate")]
	public async Task<IActionResult> Authenticate()
	{
		var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

		if (id == null)
			return Unauthorized();

		return await Authenticate(id);
	}

	[HttpGet]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Get([FromQuery] Guid id)
	{
		var result = await _userService.Get(id);
		return Ok(result);
	}

	[HttpGet("all")]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAll()
	{
		var result = await _userService.GetAll();
		return Ok(result);
	}

	[HttpPost]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Add([FromBody] User user)
	{
		var result = await _userService.Add(user);
		return Ok(result);
	}

	[HttpPut]
	[ProducesResponseType(typeof(Role), StatusCodes.Status200OK)]
	public async Task<IActionResult> Update([FromBody] User user)
	{
		var result = await _userService.Update(user);
		return Ok(result);
	}

	[HttpDelete]
	[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
	public async Task<IActionResult> Delete([FromQuery] Guid id)
	{
		await _userService.Remove(id);
		return Ok();
	}
}
