using Microsoft.EntityFrameworkCore;
using TranscriptionAPI.Models;  

namespace TranscriptionAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<AudioFile> AudioFiles { get; set; }
        public DbSet<Transcription> Transcriptions { get; set; }
        public DbSet<Log> Logs { get; set; }

    }
}
