import { Route } from '@angular/router';
import { authGuard } from './features/login/auth.guard';
import { signGuard } from './features/login/sign.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.routes),
    canActivate: [signGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/404/404.routes').then((m) => m.routes),
  },
];
