using API.Services;
using Domain;
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
            })
            .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}