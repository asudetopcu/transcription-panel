import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // SSR (Server Side Rendering) ortamı kontrolü
  if (typeof window === 'undefined') {
    return router.parseUrl('/unauthorized');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return router.parseUrl('/unauthorized');
  }

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Rota verisinde gerekli roller varsa, kontrol et
    const requiredRoles: string[] = route.data?.['roles'];
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return router.parseUrl('/unauthorized');
    }

    return true;
  } catch (err) {
    console.error('Token çözümlenemedi:', err);
    return router.parseUrl('/unauthorized');
  }
};
