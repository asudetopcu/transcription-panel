using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: /api/audio
        [HttpGet]
        public IActionResult GetAllAudioFiles()
        {
            var files = _context.AudioFiles
                .OrderByDescending(f => f.UploadedAt)
                .Select(f => new
                {
                    f.Id,
                    f.FileName,
                    f.FilePath,
                    f.UploadedAt
                })
                .ToList();

            return Ok(files);
        }

        // GET: /api/audio/{id}
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
