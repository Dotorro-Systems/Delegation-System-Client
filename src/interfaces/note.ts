import {Delegation} from './delegation';
import {User} from './user';

export interface Note {
  id: number;
  delegation: Delegation;
  user: User;
  content: string;
  createdAt: Date;
}
