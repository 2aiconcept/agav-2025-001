import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-angular/ui';
import { VerticalNavbarComponent } from '@monorepo-angular/ui';
import * as dayjs from 'dayjs';
import * as moment from 'moment';
import { AuthService } from './features/login/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './features/login/auth-store/auth.actions';
import { selectIsAuthenticated } from './features/login/auth-store/auth.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  imports: [
    UiComponent,
    RouterModule,
    VerticalNavbarComponent,
    AsyncPipe,
    NgIf,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  router = inject(Router);
  store = inject(Store);
  authService = inject(AuthService);
  public date = moment().format('DD/MM/YYYY');
  public date2 = dayjs().format('DD/MM/YYYY');
  // Observable pour savoir si l'utilisateur est connecté
  isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated
  );
  navItems = [
    {
      route: 'customers',
      label: 'Customers',
    },
    {
      route: 'orders',
      label: 'Orders',
    },
  ];
  goToSignIn() {
    this.router.navigate(['auth', 'sign-in']);
  }
  goToSignUp() {
    this.router.navigate(['auth', 'sign-up']);
  }
  signOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
