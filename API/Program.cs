using API.Extensions;
using API.Middleware;
using API.SignalR;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options =>
{
    // TODO decide which endpoints would need authentication
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

// __Security policy options__
// Prevents the MIME-sniffing of the content type:
app.UseXContentTypeOptions();
// Controls what information the browser includes when navigating away from the app:
app.UseReferrerPolicy(opt => opt.NoReferrer());
// Adds cross-site scripting protection Header:
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
// Adds Header that prevents the app being used inside an "iframe", protecting it from "click-jacking":
app.UseXfo(opt => opt.Deny());
// Protecting from cross-site scripting attacks(XSS), by "white-sourcing" approved content:
app.UseCsp(opt => opt
        .BlockAllMixedContent()
        .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "sha256-DpOoqibK/BsYhobWHnU38Pyzt5SjDZuR/mFsAiVN7kk="))
        .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
        .FormActions(s => s.Self())
        .ImageSources(s => s.Self().CustomSources("blob:", "data:", "https://res.cloudinary.com", "https://platform-lookaside.fbsbx.com"))
        .ScriptSources(s => s.Self().CustomSources("https://connect.facebook.net"))
    );

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Adds "Strict Transport Policy" Header (only in Production mode!)
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseCors(builder => builder
     //  .AllowAnyOrigin()
     .WithOrigins("https://localhost:3000", "https://localhost", "https://localhost:5000")
     .AllowAnyMethod()
     .AllowAnyHeader()
     .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

// Serving the index.html from the wwwroot with kestrel server
app.UseDefaultFiles();
// Serving the content from wwwroot
app.UseStaticFiles();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

// Creating the Database
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>(); // Events
    var userManager = services.GetRequiredService<UserManager<AppUser>>(); // Users
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();