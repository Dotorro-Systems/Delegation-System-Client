import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor() { }

  getIconByStageType(stageType: string) {
    stageType = stageType.toLowerCase();

    if (stageType === 'arrival')
      return "bi bi-send-arrow-down-fill";

    if (stageType === 'departure')
      return "bi bi-send-arrow-up-fill";

    if (stageType === 'meeting')
      return "bi bi-people-fill";

    if (stageType === 'check_in')
      return "bi bi-building-fill-down";

    if (stageType === 'check_out')
      return "bi bi-building-fill-up";

    return "bi bi-three-dots";
  }
}
