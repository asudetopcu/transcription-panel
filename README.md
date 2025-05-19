# 🎙️ Ses Transkripsiyon Yönetim Paneli

Bu proje, Çizgi Teknoloji Yazılım Stajyeri Case Study kapsamında geliştirilmiş bir ses transkripsiyon yönetim panelidir. Sistem, kullanıcıların ses dosyalarını dinlemesini, transkripsiyonları düzenlemesini ve yapılan işlemlerin izlenmesini sağlar.

## 🚀 Kullanılan Teknolojiler

- **Backend:** ASP.NET Core Web API
- **Frontend:** Angular 19
- **Veritabanı:** Microsoft SQL Server (MSSQL)
- **UI Kit:** Bootstrap 5

---

## 📁 Proje Yapısı

transcriptionAPI/ -> ASP.NET Core Web API (Backend)
transcription-fix/ -> Angular Frontend (Transcription Panel)

---

## ⚙️ Kurulum Adımları

### 1. Veritabanı (MSSQL)

-- Veritabanı oluştur
CREATE DATABASE TranscriptionDB;
GO
USE TranscriptionDB;
GO

-- Users tablosu
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(200) NOT NULL,
    Role NVARCHAR(50) NOT NULL
);
GO

-- AudioFiles tablosu
CREATE TABLE AudioFiles (
    Id INT PRIMARY KEY IDENTITY,
    FileName NVARCHAR(200) NOT NULL,
    UploadDate DATETIME DEFAULT GETDATE()
);
GO

-- Transcriptions tablosu
CREATE TABLE Transcriptions (
    Id INT PRIMARY KEY IDENTITY,
    AudioFileId INT FOREIGN KEY REFERENCES AudioFiles(Id),
    Content NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Logs tablosu
CREATE TABLE Logs (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100),
    Action NVARCHAR(200),
    Timestamp DATETIME DEFAULT GETDATE()
);
GO


### 2. Backend (ASP.NET Core)

cd transcriptionAPI
dotnet restore
dotnet run

-- API http://localhost:5240 üzerinde çalışır.
-- JWT token üretmek için giriş (/api/auth/login) yapılmalıdır.

### 3. Frontend (Angular)

cd transcription-fix
npm install
ng serve

-- Uygulama http://localhost:4200 adresinde açılır.
-- İlk giriş için token LocalStorage’a kaydedilir.

---

## 🔑 Giriş Bilgileri

| Kullanıcı Adı | Şifre     | Rol    |
| ------------- | --------- | ------ |
| admin         | 123456    | admin  |
| editor        | 123456    | editor |

---

## ✨ Özellikler

-- ✅ JWT tabanlı kimlik doğrulama (admin / editor)

-- ✅ Rol bazlı sayfa erişimi

-- ✅ Ses dosyası dinleme

-- ✅ Transkripsiyon görüntüleme ve düzenleme

-- ✅ Log kayıtları (kim, ne zaman, ne yaptı)

-- ✅ Kullanıcı ekleme, silme, düzenleme (admin)

---

## 🧪 Örnek Test Verileri

-- test.mp3 dosyası Uploads/ klasöründe mevcuttur.
-- Örnek transkripsiyon kayıtları DB'ye eklenmiştir.

---

## 📌 Notlar

--Kullanıcı yetkileri JWT içinde kodlanır.
--Log görüntüleme sadece admin rolüne özeldir.
--Responsive tasarım Bootstrap ile sağlanmıştır.
--SSR ortamı için localStorage kontrolleri yapılmıştır.

---