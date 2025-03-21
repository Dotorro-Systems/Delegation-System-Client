import { Injectable } from '@angular/core';
import {WorkLog} from '../interfaces/work-log';
import {Observable, of} from 'rxjs';
import {MockDelegationService} from '../../delegations/services/mock-delegation.service';
import {MOCK_WORK_LOGS} from '../../mocks/mock-work-logs';

@Injectable({
  providedIn: 'root'
})
export class MockWorkLogService {
  getWorkLogs(): Observable<WorkLog[]> {
    return of(MOCK_WORK_LOGS);
  }
}
