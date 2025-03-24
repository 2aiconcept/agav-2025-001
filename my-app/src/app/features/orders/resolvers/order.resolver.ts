import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, filter, first, Observable, of } from 'rxjs';
import { getOrderById } from '../orders-store/orders.actions';
import { Order } from '../models/order';
import { selectOrderById } from '../orders-store/orders.selectors';

export const orderResolver: ResolveFn<Order | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Order | null> => {
  const store = inject(Store);
  const id = route.paramMap.get('id');

  if (!id) return of(null); // Sécurité : éviter les erreurs si pas d'ID
  store.dispatch(getOrderById({ id })); //  Dispatch l'action pour récupérer l'order en bdd (utile si multi-utilisateurs)
  return store.select(selectOrderById).pipe(
    tap((order) => {
      console.log(order);
    }),
    filter((order) => !!order), // Attend que l'order soit disponible
    first() // Ne renvoie qu'une seule valeur
  );
};
