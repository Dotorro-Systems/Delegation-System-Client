import {WorkLog} from '../work-logs/interfaces/work-log';
import {MOCK_DELEGATIONS} from './mock-delegations';
import {MOCK_USERS} from './mock-users';
import {MOCK_WORK_LOG_BREAKS} from './mock-work-log-breaks';

export const MOCK_WORK_LOGS: WorkLog[] = [
  {
    id: 1,
    startTime: new Date("2024-04-10T08:00:00"),
    endTime: new Date("2024-04-10T17:00:00"),
    delegation: MOCK_DELEGATIONS[2],
    user: MOCK_USERS[0],
    workLogBreaks: [],
  },
  {
    id: 2,
    startTime: new Date("2024-05-15T09:30:00"),
    endTime: new Date("2024-05-15T18:00:00"),
    delegation: MOCK_DELEGATIONS[2],
    user: MOCK_USERS[0],
    workLogBreaks: [],
  },
  {
    id: 3,
    startTime: new Date("2024-06-05T10:00:00"),
    endTime: new Date("2024-06-05T16:30:00"),
    delegation: MOCK_DELEGATIONS[1],
    user: MOCK_USERS[1],
    workLogBreaks: [ MOCK_WORK_LOG_BREAKS[0] ],
  }
]
