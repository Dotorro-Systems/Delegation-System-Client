import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  private mockUsers: User[] = [
    /*{id: 1, firstName: 'John', lastName: 'Doe', hashedPassword: 'string', email: 'john@doe.com', role: 'Employee'},
    {id: 2, firstName: 'Alice', lastName: 'Johnson', hashedPassword: 'string', email: 'alice@johnson.com', role: 'Employee'},
    {id: 3, firstName: 'Bob', lastName: 'Smith', hashedPassword: 'string', email: 'bob@smith.com', role: 'Manager'},*/
  ]

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }
}
