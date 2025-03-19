import { Routes } from '@angular/router';
import { ListCustomersComponent } from './views/list-customers/list-customers.component';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';
import { EditCustomerComponent } from './views/edit-customer/edit-customer.component';

export const routes: Routes = [
  { path: '', component: ListCustomersComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
];
