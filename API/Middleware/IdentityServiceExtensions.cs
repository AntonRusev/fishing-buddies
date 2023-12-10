using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Middleware
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(options =>
            {
                // TODO check other options
                // options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>();

            // Using the JWT 
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["TokenKey"])
                ); // Has to be the same key as in TokenService

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // Validating the JWT
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,   // Not used in the JWT so has to be set to false 
                        ValidateAudience = false, // Not used in the JWT so has to be set to false 
                    };
                });


            services.AddScoped<TokenService>();

            return services;
        }
    }
}