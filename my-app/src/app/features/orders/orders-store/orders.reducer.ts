import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Order } from '../models/order';

export interface OrdersState {
  orders: Order[];
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.getAllOrdersSuccess, (state, { orders }) => {
    return {
      ...state,
      orders: [...orders],
    };
  }),
  on(OrdersActions.getAllOrdersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(OrdersActions.updateOrderSuccess, (state, { order }) => {
    return {
      ...state,
      orders: state.orders.map((item) => (item.id !== order.id ? item : order)),
    };
  }),
  on(OrdersActions.updateOrderFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
