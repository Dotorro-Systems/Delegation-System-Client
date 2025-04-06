import {WorkLogBreak} from '../app/features/work-logs/interfaces/work-log-break';
import {WorkLog} from '../interfaces/work-log';
import {MOCK_WORK_LOGS} from './mock-work-logs';

export const MOCK_WORK_LOG_BREAKS: WorkLogBreak[] = [
  {
    id: 1,
    workLog: undefined as any,
    startTime: new Date("2024-06-05T11:00:00"),
    endTime: new Date("2024-06-05T12:00:00"),
  }
]
