import {Delegation} from './delegation';
import {User} from './user';

export interface Expense {
  id: number;
  delegation: Delegation;
  user: User;
  description: string;
  amount: number;
  createdAt: Date;
}
