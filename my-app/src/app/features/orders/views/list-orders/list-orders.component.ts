import { Component, inject } from '@angular/core';
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
  private previousIds = new Map<number, string>();
  // sub!: Subscription;
  title = 'List Orders';
  states = Object.values(StateOrder);
  private store = inject(Store);
  collection$: Observable<Order[]> = this.store.select(selectAllOrders);
  constructor() {
    this.store.dispatch(OrdersActions.getAllOrders());
    // this.sub = this.collection$.subscribe((collection) => {
    //   console.log('Collection mise à jour:', collection);
    // });
  }
  public changeState(item: Order, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateOrder;
    this.store.dispatch(OrdersActions.changeStateOrder({ order: item, state }));
  }

  // Fonction `trackBy` pour identifier les éléments avec `id`
  trackByFn(index: number, item: Order): string {
    console.log(`Tracking: index=${index}, id=${item.id}`);
    return item.id; // Utilise `id` pour suivre les éléments
  }

  // ngDoCheck() {
  //   console.log('Angular a déclenché un cycle de détection des changements.');
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
