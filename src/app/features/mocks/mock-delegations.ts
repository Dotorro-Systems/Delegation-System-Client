import {Delegation} from '../delegations/interfaces/delegation';
import {MOCK_USERS} from './mock-users';
import {MOCK_EXPENSES} from './expenses';

export const MOCK_DELEGATIONS: Delegation[] = [
  {
    id: 1,
    title: 'Project Workshop in Berlin',
    origin: 'Warsaw, Poland',
    destination: 'Berlin, Germany',
    status: 'Planned',
    startDate: new Date("2024-07-12"),
    endDate: new Date("2024-07-19"),
    notes: [],
    users: MOCK_USERS.slice(0, 2),
    expenses: [],
    workLogs: []
  },
  {
    id: 2,
    title: "Tech Conference in San Francisco",
    origin: "London, UK",
    destination: "San Francisco, USA",
    status: 'Active',
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-05-20"),
    notes: [],
    users: MOCK_USERS.slice(0, 2),
    expenses: [],
    workLogs: []
  },
  {
    id: 3,
    title: "Project Workshop in Tokyo",
    origin: "Paris, France",
    destination: "Tokyo, Japan",
    status: 'Finished',
    startDate: new Date("2024-06-05"),
    endDate: new Date("2024-06-10"),
    notes: [],
    users: [ MOCK_USERS[0] ],
    expenses: MOCK_EXPENSES.slice(0, 2),
    workLogs: []
  }
]
