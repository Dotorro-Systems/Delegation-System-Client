import {Expense} from '../expenses/interfaces/expense';
import {MOCK_USERS} from './mock-users';
import {MOCK_DELEGATIONS} from './mock-delegations';

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    delegation: undefined as any,
    user: MOCK_USERS[0],
    description: 'Hotel Room',
    amount: 300.00,
    createdAt: new Date("2024-06-10"),
  },
  {
    id: 2,
    delegation: undefined as any,
    user: MOCK_USERS[1],
    description: 'Hotel Room',
    amount: 300.00,
    createdAt: new Date("2024-06-10"),
  }
]
