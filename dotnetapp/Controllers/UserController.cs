using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Service;
using System.Threading.Tasks;

[Route("/api/")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var existingUser = await _userService.GetUserByEmailAsync(model.Email);
        if (existingUser != null)
        {
            return Conflict("User already exists.");
        }

        var user = new User
        {
            Username = model.Username,
            Password = model.Password,
            UserRole = model.Role,
            Email = model.Email,
            MobileNumber = model.MobileNumber
        };

        var registeredUser = await _userService.RegisterUserAsync(user);
        return Ok(new { Message = "Registration successful", UserId = registeredUser.UserId });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (model == null)
        {
            return BadRequest("Invalid login request.");
        }

        var user = await _userService.GetUserByEmailAsync(model.Email);
        if (user == null || user.Password != model.Password)
        {
            return Unauthorized("Invalid username or password.");
        }

        var token = await _userService.GenerateJwtTokenAsync(user);
        if (token == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to generate JWT token.");
        }

        return Ok(new { Token = token });
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }
}
