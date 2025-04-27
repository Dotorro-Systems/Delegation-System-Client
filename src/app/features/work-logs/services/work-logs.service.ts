import {Injectable} from '@angular/core';
import {WorkLog} from '../../../../interfaces/work-log';

@Injectable({
  providedIn: 'root'
})
export class WorkLogsService {

  constructor() { }

  parseWorkLog(data: any): WorkLog {
    return {
      ...data,
      startTime: new Date(data['startTime']),
      endTime: new Date(data['endTime']),
    };
  }
}
