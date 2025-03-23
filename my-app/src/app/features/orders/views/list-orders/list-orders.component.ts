import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { Store } from '@ngrx/store';
import { selectAllOrders } from '../../orders-store/orders.selectors';
import {
  AsyncPipe,
  CurrencyPipe,
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import * as OrdersActions from '../../orders-store/orders.actions';
import { StateOrder } from '../../enums/state-order';
import { FormsModule } from '@angular/forms';
import { TotalPipe } from '../../../shared/pipes/total.pipe';
import { StateDirective } from '../../../shared/directives/state.directive';

@Component({
  selector: 'app-list-orders',
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    UpperCasePipe,
    CurrencyPipe,
    FormsModule,
    TotalPipe,
    StateDirective,
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent {
  title = 'List Orders';
  states = Object.values(StateOrder);
  private store = inject(Store);
  collection$: Observable<Order[]> = this.store.select(selectAllOrders);
  constructor() {
    this.store.dispatch(OrdersActions.getAllOrders());
  }
  public changeState(item: Order, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateOrder;
    this.store.dispatch(OrdersActions.changeStateOrder({ order: item, state }));
  }
}
