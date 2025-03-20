import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './auth-store/auth.selectors';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  // use selector to get token in Store
  return store.select(selectIsAuthenticated).pipe(
    take(1), // Prend la première valeur et termine l'observable
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['auth', 'sign-in']); // Redirection vers login si non connecté
        return false;
      }
      return true; // Autorise l'accès si connecté
    })
  );
};
