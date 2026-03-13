import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('userRole'); // Login ke time save kiya hua role

  if (userRole === 'admin') {
    return true;
  } else {
    alert('Access Denied! Only Admin can acces it ');
    router.navigate(['/dashboard']);
    return false;
  }
};