import {WorkLog} from './work-log';

export interface WorkLogBreak {
  id: number;
  workLog: WorkLog;
  startTime: Date;
  endTime: Date;
}
