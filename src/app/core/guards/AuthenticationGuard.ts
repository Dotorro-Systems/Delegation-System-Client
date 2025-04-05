import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuard implements CanActivate {
  constructor(private apiService: ApiService) {}

  canActivate(): Observable<boolean> {
    return this.apiService.isAuthenticated().pipe(
      map(response => {
        if (response) return true;
        window.location.href = '/login';
        return false;
      }),
      catchError(() => {
        window.location.href = '/login';
        return of(false);
      })
    );
  }
}
