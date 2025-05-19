import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized-container">
      <div class="card">
        <h1>403 - Yetkisiz Erişim</h1>
        <p>
          Bu sayfaya erişim izniniz bulunmamaktadır. Lütfen giriş yaptığınız kullanıcı rolünü kontrol edin.
        </p>
        <p class="note">
          Eğer bu sayfaya erişmeniz gerektiğini düşünüyorsanız sistem yöneticinizle iletişime geçin.
        </p>
        <a routerLink="/" class="btn">Ana sayfaya dön</a>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f8f9fa;
      padding: 20px;
    }

    .card {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      max-width: 500px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #dc3545;
    }

    p {
      margin: 0.5rem 0;
    }

    .note {
      font-size: 0.9rem;
      color: #6c757d;
    }

    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #0d6efd;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0b5ed7;
    }
  `]
})
export class UnauthorizedComponent {}
