import {WorkLog} from './work-log';

export interface WorkLogBreak {
  startTime: Date;
  endTime: Date;
  workLog: WorkLog;
}
