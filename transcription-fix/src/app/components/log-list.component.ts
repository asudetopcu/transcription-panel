import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  logs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token bulunamadı.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:5240/api/transcription/logs', { headers })
      .subscribe({
        next: res => {
          console.log('Log verisi:', res);
          this.logs = res;
        },
        error: err => console.error('Loglar alınamadı', err)
      });

  }
}
