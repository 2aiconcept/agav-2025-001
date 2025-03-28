import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  //   constructor(private actions$: Actions, private authService: AuthService) {}
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.signIn({ email, password }).pipe(
          map((user) => {
            // Enregistre le token et l'utilisateur dans le localStorage ICI (dans l'Effect)
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user.user));
            return AuthActions.loginSuccess({
              user: user.user,
              token: user.accessToken,
            });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );
  //   effect to redirect on route orders
  redirectToOrders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/orders'])) // Redirection après connexion
      ),
    { dispatch: false } // Ne déclenche pas d'action supplémentaire
  );
  //   effect to redirect on route orders
  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['auth', 'sign-in'])) // Redirection après connexion
      ),
    { dispatch: false } // Ne déclenche pas d'action supplémentaire
  );
  reLogin$ = createEffect(
    () =>
      of(localStorage.getItem('token')).pipe(
        tap((token) => {
          if (token) {
            try {
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              // Dispatch l'action loginSuccess pour remettre les données en mémoire
              this.store.dispatch(AuthActions.loginSuccess({ user, token }));
            } catch (e) {
              console.error(
                'Erreur lors de la lecture du token ou du user depuis le localStorage :',
                e
              );
            }
          }
        })
      ),
    { dispatch: false } // On ne déclenche pas une nouvelle action ici
  );

  //   effect to signUp
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp({ email, password }).pipe(
          tap(() => this.router.navigate(['auth', 'sign-in'])),
          catchError((error) =>
            of(AuthActions.signUpFailure({ error: error.message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // Supprime le token et l'utilisateur du localStorage ici
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
      ),
    { dispatch: false } // Parce que mon effet Ne déclenche pas d'action en sortie
  );
}
