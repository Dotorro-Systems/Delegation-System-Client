import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    if (typeof window !== "undefined") {
      this.apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : `http://${window.location.hostname}:8080`;
    }
    else
      this.apiUrl = 'http://localhost:8080';
  }

  public get<T>(endpoint: string, body: {} = {}): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  public getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }

  public post<T>(endpoint: string, body: {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  public put<T>(endpoint: string, body: {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
