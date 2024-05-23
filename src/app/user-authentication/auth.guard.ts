import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Inject, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  authService: Inject(AuthService);

  return inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['']);
};
