import { Injectable } from '@angular/core';
import {Expense} from '../../../../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor() { }

  parseExpense(data: any): Expense {
    return {
      ...data,
      createdAt: new Date(data['createdAt']),
    }
  }
}
