import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-angular/ui';
import { VerticalNavbarComponent } from '@monorepo-angular/ui';
import * as dayjs from 'dayjs';
import * as moment from 'moment';
import { AuthService } from './features/login/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './features/login/auth-store/auth.actions';

@Component({
  imports: [UiComponent, RouterModule, VerticalNavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);
  store = inject(Store);
  authService = inject(AuthService);
  public date = moment().format('DD/MM/YYYY');
  public date2 = dayjs().format('DD/MM/YYYY');
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
