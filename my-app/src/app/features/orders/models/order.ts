import { StateOrder } from '../enums/state-order';
import { OrderI } from '../interfaces/order-i';

export class Order implements OrderI {
  unitPrice = 500;
  nbOfDays!: number;
  vat = 20;
  state = StateOrder.OPTION;
  type!: string;
  customer!: string;
  comment!: string;
  id!: string;
  constructor(obj?: Partial<Order>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
