import {Delegation} from './delegation';

export interface Stage {
  id: number
  delegation: Delegation;
  type: string;
  place: string;
  description: string;
  time: Date;
}
