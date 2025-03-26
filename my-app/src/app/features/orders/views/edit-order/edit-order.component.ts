import { Component, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectOrderById } from '../../orders-store/orders.selectors';
import { FormOrderComponent } from '../../components/form-order.component';
import { Order } from '../../models/order';
import { AsyncPipe } from '@angular/common';
import { updateOrder } from '../../orders-store/orders.actions';

@Component({
  selector: 'app-edit-order',
  imports: [FormOrderComponent, AsyncPipe],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent {
  // private route = inject(ActivatedRoute);
  private store = inject(Store);
  order$ = this.store.select(selectOrderById);
  constructor() {
    // this.route.data.subscribe((data) => console.log(data));
    // this.order$.subscribe((data) => console.log(data));
  }

  save(order: Order) {
    this.store.dispatch(updateOrder({ order }));
  }
}
