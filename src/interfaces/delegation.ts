import {Expense} from './expense';
import {WorkLog} from './work-log';
import {User} from './user';
import {Note} from './note';
import {Department} from './department';

export interface Delegation {
  id: number;
  title: string;
  origin: string;
  destination: string;
  status: string;
  department: Department;
  startDate: Date;
  endDate: Date;
  notes: Note[];
  users: User[];
  expenses: Expense[];
  workLogs: WorkLog[];
}
