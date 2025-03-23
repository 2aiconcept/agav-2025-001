import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

// Sélectionner la feature `orders` dans le Store
export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

// Sélectionner les orders
export const selectAllOrders = createSelector(
  selectOrdersState, // Sélectionne le state `orders`
  (OrdersState) => {
    console.log('Selector appelé - Nouvelle liste générée');
    return OrdersState.orders; // Retourne uniquement la propriété orders du state orders
  }
);
