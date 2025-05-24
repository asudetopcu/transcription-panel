import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { authGuard } from './guards/auth.guard';
import { LogListComponent } from './components/log-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AudioFileListComponent } from './pages/audio-file-list/audio-file-list.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'transcription/:id',
    loadComponent: () => import('./transcription-editor/transcription-editor.component').then(m => m.TranscriptionEditorComponent),
    canActivate: [authGuard],
    data: { roles: ['admin', 'editor'] }
  },
  {
    path: 'logs',
    component: LogListComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'files',
    component: AudioFileListComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'editor'] }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'users', component: UserManagementComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
  { path: '**', redirectTo: 'login' }
];
