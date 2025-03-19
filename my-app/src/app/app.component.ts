import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-angular/ui';
import { VerticalNavbarComponent } from '@monorepo-angular/ui';
import * as dayjs from 'dayjs';
import * as moment from 'moment';

@Component({
  imports: [UiComponent, RouterModule, VerticalNavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
}
