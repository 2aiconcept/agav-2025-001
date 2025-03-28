import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, of, switchMap } from 'rxjs';
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
      switchMap(() =>
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
      switchMap(({ order, state }) =>
        this.ordersService.changeState(order, state).pipe(
          map((order) =>
            OrdersActions.updateOrderSuccess({
              order,
            })
          ),
          catchError((error) =>
            of(OrdersActions.updateOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getOrderById),
      switchMap(({ id }) =>
        this.ordersService.getItemById(id).pipe(
          map((order) =>
            OrdersActions.getOrderByIdSuccess({
              order: order,
            })
          ),
          catchError((error) =>
            of(OrdersActions.getOrderByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      switchMap(({ order }) =>
        this.ordersService.updateItem(order).pipe(
          map((order) =>
            OrdersActions.updateOrderSuccess({
              order,
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
