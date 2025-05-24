using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TranscriptionAPI.Data;
using TranscriptionAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace TranscriptionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TranscriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TranscriptionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{audioFileId}")]
        public IActionResult GetTranscription(int audioFileId)
        {
            var transcription = _context.Transcriptions
                .FirstOrDefault(t => t.AudioFileId == audioFileId);

            if (transcription == null)
                return NotFound();

            return Ok(transcription);
        }

        [HttpPost("{audioFileId}")]
    public IActionResult UpdateTranscription(int audioFileId, [FromBody] string content)
    {
        var transcription = _context.Transcriptions.FirstOrDefault(t => t.AudioFileId == audioFileId);

        if (transcription == null)
        {
            transcription = new Transcription
            {
                AudioFileId = audioFileId,
                Content = content,
                LastEditedAt = DateTime.Now,
                LastEditedBy = GetUserId()
            };
            _context.Transcriptions.Add(transcription);
        }
        else
        {
            transcription.Content = content;
            transcription.LastEditedAt = DateTime.Now;
            transcription.LastEditedBy = GetUserId();
        }

        _context.Logs.Add(new Log
        {
            UserId = GetUserId(),
            Action = $"AudioFileId={audioFileId} için transkripsiyon güncellendi",
            Timestamp = DateTime.Now
        });

        _context.SaveChanges();
        return Ok(transcription);
    }

    [HttpGet("logs")]
    [Authorize(Roles = "admin")]
    public IActionResult GetLogs()
    {
        var logs = _context.Logs
            .Include(l => l.User)
            .OrderByDescending(l => l.Timestamp)
            .Select(l => new {
                l.Timestamp,
                l.Action,
                Username = l.User.Username
            })
            .ToList();

        return Ok(logs);
    }
    
    [HttpGet("files")]
        public IActionResult GetAudioFiles()
        {
            var files = _context.AudioFiles.ToList();
            return Ok(files);
        }



        private int GetUserId()
        {
            var claim = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (claim == null) throw new Exception("Token'da kullanıcı kimliği (NameIdentifier) bulunamadı.");
            return int.Parse(claim.Value);
        }

    }
}
