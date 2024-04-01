using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
                options.SignIn.RequireConfirmedEmail = true;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+/ ";
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddDefaultTokenProviders();

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
                        ValidateLifetime = true, // Lifetime of a token has 5 minute window, by default
                        ClockSkew = TimeSpan.Zero, // Removes the 5 minute window ^
                    };

                    options.Events = new JwtBearerEvents
                    {
                        // Getting the Access Token(JWT) from the query string 
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;

                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                            {
                                context.Token = accessToken;
                            };

                            return Task.CompletedTask;
                        }
                    };
                });

            // Adding a requirement for a User to be the Host of the Event in order to be able to Edit it
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsEventHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}