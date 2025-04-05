import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    if (typeof window !== "undefined") {
      this.apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : `http://${window.location.hostname}:8080`;
    }
    else
      this.apiUrl = 'http://localhost:8080';
  }

  public get<T>(endpoint: string, headers: {} = {}): Observable<T> { return this.http.get<T>(`${this.apiUrl}/${endpoint}`, headers); }
  public post<T>(endpoint: string, body: {}, headers: {} = {}): Observable<T> { return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, headers); }
  public put<T>(endpoint: string, body: {}): Observable<T> { return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body); }
  public delete<T>(endpoint: string, body: {}): Observable<T> { return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, body); }

  public getMe(): User {
    let me = null;

    this.get('users/me')
      .subscribe({
        next: (user) => {
          me = user;
        }
      })

    // @ts-ignore
    return me;
  }

  public isAuthenticated(): Observable<boolean> {
    return this.get('authenticated', { withCredentials: true });
  }
}
