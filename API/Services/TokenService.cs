using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        public string CreateToken(AppUser user)
        {
            // Setting up the information passed in the JWT
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // Setting up a key for the JWT signature
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["TokenKey"])
                ); // 64bit key is requeired

            // Generating the signature of the JWT
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1), // Setting JWT's expiration date
                SigningCredentials = credentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        // Generating Refresh Token
        public RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32]; // Generating a number
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber); // Randomizing the number
            return new RefreshToken { Token = Convert.ToBase64String(randomNumber) };
        }
    }
}