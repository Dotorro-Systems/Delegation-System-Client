import {Injectable} from '@angular/core';
import {Delegation} from '../../../../interfaces/delegation';
import {NotesService} from '../../notes/services/notes.service';
import {ExpensesService} from '../../expenses/services/expenses.service';

@Injectable({
  providedIn: 'root'
})

export class DelegationsService {

  constructor(
    private notesService: NotesService,
    private expensesService: ExpensesService,
  ) { }

  parseDelegation(data: any): Delegation {
    return {
      ...data,
      startDate: new Date(data['startDate']),
      endDate: new Date(data['endDate']),
      notes: data['notes'].map(this.notesService.parseNote),
      expenses: data['expenses'].map(this.expensesService.parseExpense),
    };
  }
}
