import {Injectable} from '@angular/core';
import {Delegation} from '../../../../interfaces/delegation';
import {NotesService} from '../../notes/services/notes.service';
import {ExpensesService} from '../../expenses/services/expenses.service';
import {WorkLogsService} from '../../work-logs/services/work-logs.service';
import {StagesService} from '../../stages/services/stages.service';

@Injectable({
  providedIn: 'root'
})

export class DelegationsService {

  constructor(
    private notesService: NotesService,
    private expensesService: ExpensesService,
    private workLogService: WorkLogsService,
    private stagesService: StagesService,
  ) { }

  parseDelegation(data: any): Delegation {
    return {
      ...data,
      startDate: new Date(data['startDate']),
      endDate: new Date(data['endDate']),
      notes: data['notes'].map(this.notesService.parseNote),
      expenses: data['expenses'].map(this.expensesService.parseExpense),
      workLogs: data['workLogs'].map(this.workLogService.parseWorkLog),
      stages: data['stages'].map(this.stagesService.parseStage),
    };
  }
}
