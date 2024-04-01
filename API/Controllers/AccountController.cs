using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Services;
using Domain;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
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
        private readonly SignInManager<AppUser> _signInManager;
        private readonly EmailSender _emailSender;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        TokenService tokenService, IConfiguration config, EmailSender emailSender)
        {
            _emailSender = emailSender;
            _signInManager = signInManager;
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

            // If there is no such email in the DB, the email is invalid
            if (user == null)
            {
                return Unauthorized("Invalid email");
            }

            // Setting up an account with confirmed email for testing purposes
            if (user.UserName == "anton")
            {
                user.EmailConfirmed = true;
            }

            // If the email is not confirmed
            if (!user.EmailConfirmed)
            {
                return Unauthorized("Email not confirmed");
            }

            // Checking if the provided password is valid for that email 
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Invalid password");
            };

            // Adding a Refresh Token to the account of the User
            await SetRefreshToken(user);
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

            if (!result.Succeeded)
            {
                return BadRequest("Problem registering user");
            }

            // Getting the origin, where the request comes from
            var origin = Request.Headers["origin"];
            
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            // Encoding the Token so that it doesn't get modified on the way to the client
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            // Verification URL
            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";

            // Verification email message
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

            return Ok("Registration success - please verify email");
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Unauthorized();
            }

            // Decoding the received token
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded)
            {
                return BadRequest("Could not verify email address");
            }

            return Ok("Email confirmed - you can now login");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Unauthorized();
            }

            var origin = Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            // Encoding the Token so that it doesn't get modified on the way to the client
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            // Verification URL
            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";

            // Verification email message
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

            return Ok("Email verification link reset");
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Getting an User based on the JWT sent with the request
            var user = await _userManager.Users.Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            // Adding a Refresh Token to the account of the User
            await SetRefreshToken(user); // TODO - Decide if this is appropriate place for Refresh Token
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

            // Adding a Refresh Token to the account of the User
            await SetRefreshToken(user);
            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            // Extracting the Refresh Token from the Cookies
            var refreshToken = Request.Cookies["refreshToken"];

            // Getting the User that makes the request
            var user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return Unauthorized();

            // Getting the old(previous) Refresh Token
            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            // If the old Refresh Token is expired, not sending a new one
            if (oldToken != null && !oldToken.IsActive) return Unauthorized();

            // Revoking the Old Token
            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;

            return CreateUserObject(user);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            // Generating Refresh Token
            var refreshToken = _tokenService.GenerateRefreshToken();

            // Assigning the Refresh Token to a User
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            // Generating Cookies
            var cookieOptions = new CookieOptions
            {
                // The Token won't be accessible via JavaScript
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            // Including the Refresh Token in the Response
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
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