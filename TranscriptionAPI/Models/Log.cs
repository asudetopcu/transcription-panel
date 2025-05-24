namespace TranscriptionAPI.Models
{
    public class Log
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string Action { get; set; }
            public DateTime Timestamp { get; set; }

            public User User { get; set; }
        }

}