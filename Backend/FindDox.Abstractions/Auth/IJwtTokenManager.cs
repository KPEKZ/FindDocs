using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace FindDox.Abstractions.Auth;

public interface IJwtTokenManager
{
	string Schema { get; set; }
	JwtBearerEvents Events { get; }
	TokenValidationParameters ValidationParameters { get; }
	string GenerateToken(Guid id, string nickname);
}
