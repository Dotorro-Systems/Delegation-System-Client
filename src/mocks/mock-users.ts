import {User} from '../interfaces/user';
import {MOCK_DEPARTMENTS} from './mock-department';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    hashedPassword: 'string',
    phone: '+1 123456789',
    email: 'john@doe.com',
    role: 'Employee',
    department: MOCK_DEPARTMENTS[0]
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Johnson',
    hashedPassword: 'string',
    phone: '+1 123456789',
    email: 'alice@johnson.com',
    role: 'Employee',
    department: MOCK_DEPARTMENTS[0]
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Smith',
    hashedPassword: 'string',
    phone: '+1 123456789',
    email: 'bob@smith.com',
    role: 'Manager',
    department: MOCK_DEPARTMENTS[2]
  },
]
