import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  username = '';
  password = '';
  role = 'editor'; // Varsayılan rol
  selectedUserId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  get headers() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:5240/api/users', this.headers)
      .subscribe({
        next: data => this.users = data,
        error: err => console.error('Kullanıcılar alınamadı:', err)
      });
  }


  saveUser() {
    const payload = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    if (this.selectedUserId) {
      // Güncelleme
      this.http.put(`http://localhost:5240/api/users/${this.selectedUserId}`, payload, this.headers)
        .subscribe(() => {
          this.resetForm();
          this.fetchUsers();
        });
    } else {
      // Yeni kullanıcı ekleme
      this.http.post('http://localhost:5240/api/users', payload, this.headers)
        .subscribe(() => {
          this.resetForm();
          this.fetchUsers();
        });
    }
  }

  editUser(user: any) {
    this.username = user.username;
    this.role = user.role || 'editor';
    this.selectedUserId = user.id;
  }

  deleteUser(id: number) {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.http.delete(`http://localhost:5240/api/users/${id}`, this.headers)
        .subscribe(() => this.fetchUsers());
    }
  }

  resetForm() {
    this.username = '';
    this.password = '';
    this.role = 'editor';
    this.selectedUserId = null;
  }

  logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
  }

}
