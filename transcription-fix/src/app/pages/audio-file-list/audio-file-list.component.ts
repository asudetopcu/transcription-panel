import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-audio-file-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './audio-file-list.component.html',
  styleUrls: ['./audio-file-list.component.scss']
})
export class AudioFileListComponent implements OnInit {
  audioFiles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAudioFiles();
  }

  get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  fetchAudioFiles(): void {
  this.http.get<any[]>('http://localhost:5240/api/audio', this.headers)
    .subscribe({
      next: data => {
        console.log('Ses dosyaları:', data);
        this.audioFiles = data;
      },
      error: err => console.error('Ses dosyaları alınamadı:', err)
    });
  }



  goToEditor(id: number) {
    window.location.href = `/transcription/${id}`; 
  }
}
