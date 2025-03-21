import {Delegation} from '../../delegations/interfaces/delegation';
import {User} from '../../users/interfaces/user';

export interface Note {
  id: number;
  delegation: Delegation;
  user: User;
  content: string;
  createdAt: Date;
}
