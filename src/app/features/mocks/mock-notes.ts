import {Note} from '../notes/interfaces/note';
import {MOCK_DELEGATIONS} from './mock-delegations';
import {MOCK_USERS} from './mock-users';

export const MOCK_NOTES: Note[] = [
  {
    id: 1,
    delegation: undefined as any,
    user: MOCK_USERS[0],
    content: "Some very important note",
    createdAt: new Date("2024-07-12"),
  },
  {
    id: 2,
    delegation: undefined as any,
    user: MOCK_USERS[0],
    content: "Some another very important note",
    createdAt: new Date("2024-07-12"),
  },
  {
    id: 3,
    delegation: undefined as any,
    user: MOCK_USERS[0],
    content: "Some even more important note",
    createdAt: new Date("2024-07-12"),
  }
]
