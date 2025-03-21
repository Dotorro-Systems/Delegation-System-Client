import {Delegation} from '../../delegations/interfaces/delegation';
import {User} from '../../users/interfaces/user';
import {WorkLogBreak} from './work-log-break';

export interface WorkLog {
  id: number;
  startTime: Date;
  endTime: Date;
  delegation: Delegation;
  user: User;
  workLogBreaks: WorkLogBreak[];
}
