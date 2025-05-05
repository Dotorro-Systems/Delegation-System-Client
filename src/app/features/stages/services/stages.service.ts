import { Injectable } from '@angular/core';
import {Stage} from '../../../../interfaces/stage';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  constructor() { }

  parseStage(data: any): Stage {
    return {
      ...data,
      time: new Date(data['time']),
    };
  }
}
