import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-transcription-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transcription-editor.component.html',
  styleUrls: ['./transcription-editor.component.scss']
})
export class TranscriptionEditorComponent implements OnInit {
  audioFileId = 1;
  audioUrl = 'http://localhost:5240/Uploads/test.mp3';
  transcriptionText = '';
  username = '';
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.decodeUser();
    this.getTranscription();
  }

  decodeUser() {
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      this.username = decoded?.unique_name || 'Kullanıcı';
    }
  }

  get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getTranscription(): void {
    this.http.get<any>(`http://localhost:5240/api/transcription/${this.audioFileId}`, this.headers)
      .subscribe({
        next: res => this.transcriptionText = res.content,
        error: err => console.warn('Transkripsiyon alınamadı:', err)
      });
  }

  save(): void {
    this.http.post(`http://localhost:5240/api/transcription/${this.audioFileId}`,
      JSON.stringify(this.transcriptionText), this.headers)
      .subscribe({
        next: () => alert('Kaydedildi'),
        error: err => alert('Hata: ' + err.message)
      });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
