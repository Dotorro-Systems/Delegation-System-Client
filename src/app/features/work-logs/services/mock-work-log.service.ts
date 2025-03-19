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
      delegationId: 1,
      userId: 3,
      startTime: new Date("2024-04-10T08:00:00"),
      endTime: new Date("2024-04-10T17:00:00")
    },
    {
      id: 2,
      delegationId: 1,
      userId: 2,
      startTime: new Date("2024-05-15T09:30:00"),
      endTime: new Date("2024-05-15T18:00:00")
    },
    {
      id: 3,
      delegationId: 2,
      userId: 1,
      startTime: new Date("2024-06-05T10:00:00"),
      endTime: new Date("2024-06-05T16:30:00")
    }
  ]

  getWorkLogs(): Observable<WorkLog[]> {
    return of(this.mockWorkLogs);
  }
}
