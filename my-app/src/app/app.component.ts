import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-angular/ui';
import { VerticalNavbarComponent } from '@monorepo-angular/ui';

@Component({
  imports: [UiComponent, RouterModule, VerticalNavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navItems = [
    {
      route: 'customers',
      label: 'Customers'
    },
    {
      route: 'orders',
      label: 'Orders'
    }
  ]
}
