import {Expense} from '../../expenses/interfaces/expense';
import {WorkLog} from '../../work-logs/interfaces/work-log';
import {User} from '../../users/interfaces/user';
import {Note} from '../../notes/interfaces/note';

export interface Delegation {
  id: number;
  title: string;
  origin: string;
  destination: string;
  status: string;
  startDate: Date;
  endDate: Date;
  notes: Note[];
  users: User[];
  expenses: Expense[];
  workLogs: WorkLog[];
}
