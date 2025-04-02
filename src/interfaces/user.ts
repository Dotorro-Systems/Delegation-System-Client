import {Department} from './department';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  phone: string;
  email: string;
  role: string;
  department: Department;
}
