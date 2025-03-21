import { Injectable } from '@angular/core';
import {Department} from '../interfaces/department';
import {Observable, of} from 'rxjs';
import {MOCK_DEPARTMENTS} from '../../mocks/mock-department';

@Injectable({
  providedIn: 'root'
})
export class MockDepartmentService {
  getDepartments(): Observable<Department[]> {
    return of(MOCK_DEPARTMENTS);
  }
}
