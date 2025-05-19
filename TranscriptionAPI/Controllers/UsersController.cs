using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TranscriptionAPI.Data;
using TranscriptionAPI.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _context.Users.Select(u => new {
            u.Id,
            u.Username,
            u.Role
        }).ToList();
        return Ok(users);
    }

    [HttpPost]
    public IActionResult AddUser([FromBody] UserRegisterDto dto)
    {
        if (_context.Users.Any(u => u.Username == dto.Username))
            return BadRequest("Bu kullanıcı adı zaten mevcut.");

        var hashed = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        var user = new User
        {
            Username = dto.Username,
            PasswordHash = hashed,
            Role = "editor"
        };
        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, [FromBody] UserRegisterDto dto)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();

        user.Username = dto.Username;
        if (!string.IsNullOrWhiteSpace(dto.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        _context.SaveChanges();
        return Ok();
    }
}
