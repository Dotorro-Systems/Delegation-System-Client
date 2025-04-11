import {Injectable} from '@angular/core';
import {Note} from '../../../../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  parseNote(data: any): Note {
    return {
      ...data,
      createdAt: new Date(data['createdAt']),
    };
  }
}
