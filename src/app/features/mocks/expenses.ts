import {Expense} from '../expenses/interfaces/expense';
import {MOCK_DELEGATIONS} from './mock-delegations';
import {MOCK_USERS} from './mock-users';

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    delegation: MOCK_DELEGATIONS[1],
    user: MOCK_USERS[0],
    description: 'Hotel Room',
    amount: 300.00,
    createAt: new Date("2024-06-10"),
  },
  {
    id: 2,
    delegation: MOCK_DELEGATIONS[1],
    user: MOCK_USERS[1],
    description: 'Hotel Room',
    amount: 300.00,
    createAt: new Date("2024-06-10"),
  }
]
