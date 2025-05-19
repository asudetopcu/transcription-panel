namespace TranscriptionAPI.Models
{
    public class Transcription
    {
        public int Id { get; set; }
        public int AudioFileId { get; set; }
        public string Content { get; set; }
        public int LastEditedBy { get; set; }
        public DateTime LastEditedAt { get; set; }
    }
}