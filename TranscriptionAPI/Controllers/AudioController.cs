using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TranscriptionAPI.Data;
using TranscriptionAPI.Models;

namespace TranscriptionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class AudioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AudioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllAudioFiles()
        {
            var files = _context.AudioFiles.ToList();
            return Ok(files);
        }

        [HttpGet("{id}")]
        public IActionResult GetAudioFile(int id)
        {
            var file = _context.AudioFiles.FirstOrDefault(f => f.Id == id);
            if (file == null)
                return NotFound();

            return Ok(file);
        }
    }
}
