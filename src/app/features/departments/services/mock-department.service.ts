import { Injectable } from '@angular/core';
import {Department} from '../interfaces/department';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDepartmentService {
  private mockDepartments: Department[] = [
    {id: 1, name: 'Human Resources'},
    {id: 2, name: 'Finance & Accounting'},
    {id: 3, name: 'Research & Development'},
  ]

  getDepartments(): Observable<Department[]> {
    return of(this.mockDepartments);
  }
}
