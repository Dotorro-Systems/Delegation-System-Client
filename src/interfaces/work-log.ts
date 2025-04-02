import {Delegation} from './delegation';
import {User} from './user';
import {WorkLogBreak} from './work-log-break';

export interface WorkLog {
  id: number;
  startTime: Date;
  endTime: Date;
  delegation: Delegation;
  user: User;
  workLogBreaks: WorkLogBreak[];
}
