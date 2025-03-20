import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './auth-store/auth.selectors';
import { map, take } from 'rxjs';

// empecher l'acces a sign-in et sign-up si l'utilisateur est connecté
export const signGuard: CanActivateFn = () => {
  const store = inject(Store);
  // use selector to get token in Store
  return store.select(selectIsAuthenticated).pipe(
    take(1), // Prend la première valeur et termine l'observable
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return false;
      }
      return true; // Autorise l'accès si user non connecté
    })
  );
};
