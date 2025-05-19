namespace TranscriptionAPI.Models
{
    public class Log
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string Action { get; set; } = null!;
            public DateTime Timestamp { get; set; }

            public User User { get; set; } = null!;
        }

}