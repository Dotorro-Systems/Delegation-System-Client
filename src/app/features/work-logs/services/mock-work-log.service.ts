import { Injectable } from '@angular/core';
import {WorkLog} from '../interfaces/work-log';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockWorkLogService {
  private mockWorkLogs: WorkLog[] = [
    {
      id: 1,
      delegation_id: 1,
      user_id: 3,
      start_time: new Date("2024-04-10T08:00:00"),
      end_time: new Date("2024-04-10T17:00:00")
    },
    {
      id: 2,
      delegation_id: 1,
      user_id: 2,
      start_time: new Date("2024-05-15T09:30:00"),
      end_time: new Date("2024-05-15T18:00:00")
    },
    {
      id: 3,
      delegation_id: 2,
      user_id: 1,
      start_time: new Date("2024-06-05T10:00:00"),
      end_time: new Date("2024-06-05T16:30:00")
    }
  ]

  getWorkLogs(): Observable<WorkLog[]> {
    return of(this.mockWorkLogs);
  }
}
