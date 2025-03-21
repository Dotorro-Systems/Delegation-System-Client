import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, of} from 'rxjs';
import {MOCK_USERS} from '../../mocks/mock-users';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  getUsers(): Observable<User[]> {
    return of(MOCK_USERS);
  }
}
