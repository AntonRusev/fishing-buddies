using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IConfiguration config)
        {
            _config = config;
            _tokenService = tokenService;
            _userManager = userManager;
            _httpClient = new HttpClient
            {
                // Verifying the token from Facebook
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Checking if User with that Email adress exists in the database
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            // Checking if the provided password is valid for that email 
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
            {
                return Unauthorized();
            };

            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username is already taken");
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email is already taken");
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Getting an User based on the JWT sent with the request
            var user = await _userManager.Users.Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _config["Facebook:AppId"] + "|" + _config["Facebook:AppSecret"];

            // Verifying that the Facebook token was issued for this particular application
            var verifyTokenResponse = await _httpClient
                .GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if (!verifyTokenResponse.IsSuccessStatusCode) return Unauthorized();

            // Specifying that we want to get the name, the email, and the picture with format 100x100px of the User
            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

            var fbInfo = await _httpClient.GetFromJsonAsync<FacebookDto>(fbUrl);

            // Checking if that particular User has logged in before
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == fbInfo.Email);

            // If User already exists in the DB
            if (user != null) return CreateUserObject(user);

            // If there is no such user in the DB, create new User
            user = new AppUser
            {
                UserName = fbInfo.Name,
                Email = fbInfo.Email,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Id = "fb_" + fbInfo.Id,
                        Url = fbInfo.Picture.Data.Url,
                        IsMain = true
                    }
                }
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem creating user account");

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Username = user.UserName,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}