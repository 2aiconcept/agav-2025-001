import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, of } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private ordersService = inject(OrdersService);
  //   private router = inject(Router);
  private store = inject(Store);
  orders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getAllOrders),
      mergeMap(() =>
        this.ordersService.collection.pipe(
          map((orders) =>
            OrdersActions.getAllOrdersSuccess({
              orders: orders,
            })
          ),
          catchError((error) =>
            of(OrdersActions.getAllOrdersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  changeState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.changeStateOrder),
      mergeMap(({ order, state }) =>
        this.ordersService.changeState(order, state).pipe(
          map((order) =>
            OrdersActions.updateOrderSuccess({
              order
            })
          ),
          catchError((error) =>
            of(OrdersActions.updateOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
