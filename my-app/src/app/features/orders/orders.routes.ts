import { Routes } from '@angular/router';
import { ListOrdersComponent } from './views/list-orders/list-orders.component';
import { AddOrderComponent } from './views/add-order/add-order.component';
import { EditOrderComponent } from './views/edit-order/edit-order.component';
import { orderResolver } from './resolvers/order.resolver';

export const routes: Routes = [
  { path: '', component: ListOrdersComponent },
  { path: 'add', component: AddOrderComponent },
  {
    path: 'edit/:id',
    component: EditOrderComponent,
    resolve: { order: orderResolver }, //  Ajout du Resolver
  },
];
