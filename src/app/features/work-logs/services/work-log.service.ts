import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {WorkLog} from '../interfaces/work-log';

@Injectable({
  providedIn: 'root'
})
export class WorkLogService extends ApiService {

  public getWorkLogs(): Observable<WorkLog[]> {
    return this.getAll<WorkLog>("workLogs");
  }

  public getById(id: number): Observable<WorkLog> {
    return this.get<WorkLog>(`workLogs/${id}`);
  }

  public addWorkLog(workLog: WorkLog): Observable<WorkLog> {
    return this.post<WorkLog>("workLogs/", workLog);
  }

  public putWorkLog(workLogId: number, updatedWorkLog: WorkLog): Observable<WorkLog> {
    return this.put<WorkLog>(`workLogs/${workLogId}`, updatedWorkLog);
  }

  public deleteWorkLog(workLogId: number): Observable<Object> {
    return this.delete<Object>(`workLogs/${workLogId}`);
  }
}
