using FindDox.Abstractions.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FindDox.Api.Auth;

public class JwtTokenManager : IJwtTokenManager
{
	private static SecurityKey SecurityKey;

	public JwtTokenManager ()
	{
		SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("das764ty23ibkvscks"));
	}

	public JwtBearerOptions Options =>
		new()
		{
			RequireHttpsMetadata = false,
			IncludeErrorDetails = false
		};

	public string Schema { get; set; } = "Bearer";

	public JwtBearerEvents Events
	{
		get
		{
			return new JwtBearerEvents
			{
				OnMessageReceived = context => Task.CompletedTask,
				OnTokenValidated = context => Task.CompletedTask,
				OnChallenge = context => Task.CompletedTask,
				OnAuthenticationFailed = context => Task.CompletedTask
			};
		}
	}

	public TokenValidationParameters ValidationParameters =>
		new()
		{
			ValidateIssuerSigningKey = true,
			ValidateIssuer = true,
			ValidIssuer = "FindDox.Api",
			IssuerSigningKey = SecurityKey,
			ValidateAudience = false,
			ClockSkew = TimeSpan.Zero,
		};

	public string GenerateToken(Guid id, string nickname)
	{
		var userClaims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, id.ToString()),
			new Claim(ClaimTypes.Name, nickname)
		};

		var jwtToken = new JwtSecurityToken(
			issuer: "FindDox.Api",
			audience: nickname,
			claims: userClaims,
			notBefore: DateTime.UtcNow,
			expires: DateTime.UtcNow.AddMinutes(30),
			signingCredentials: new SigningCredentials(SecurityKey, SecurityAlgorithms.Aes128Encryption)
			);

		return new JwtSecurityTokenHandler().WriteToken(jwtToken);
	}
}
