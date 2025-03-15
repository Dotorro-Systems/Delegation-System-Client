import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  public getUsers(): Observable<User[]> {
    return this.getAll<User>("users");
  }

  public getById(id: number): Observable<User> {
    return this.get<User>(`users/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.post<User>("users/create", user);
  }

  public putUser(userId: number, updatedUser: User): Observable<User> {
    return this.put<User>(`users/${userId}`, updatedUser);
  }

  public deleteUser(userId: number): Observable<Object> {
    return this.delete<Object>(`users/${userId}`);
  }
}
