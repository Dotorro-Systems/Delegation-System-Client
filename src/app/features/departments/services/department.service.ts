import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {Department} from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ApiService {

  public getDepartments(): Observable<Department[]> {
    return this.getAll<Department>("departments");
  }

  public getById(id: number): Observable<Department> {
    return this.get<Department>(`departments/${id}`);
  }

  public addDepartment(department: Department): Observable<Department> {
    return this.post<Department>("departments/", department);
  }

  public putDepartment(departmentId: number, updatedDepartment: Department): Observable<Department> {
    return this.put<Department>(`departments/${departmentId}`, updatedDepartment);
  }

  public deleteDepartment(departmentId: number): Observable<Object> {
    return this.delete<Object>(`departments/${departmentId}`);
  }
}
