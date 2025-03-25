import {Delegation} from '../../delegations/interfaces/delegation';
import {User} from '../../users/interfaces/user';

export interface Expense {
  id: number;
  delegation: Delegation;
  user: User;
  description: string;
  amount: number;
  createdAt: Date;
}
