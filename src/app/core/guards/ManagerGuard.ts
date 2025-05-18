import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root',
})

export class ManagerGuard implements CanActivate {
  constructor(private apiService: ApiService) {}

  canActivate(): Observable<boolean> {
    return this.apiService.getMe().pipe(map(response => {
        if (response && response.role != 'EMPLOYEE') return true;
        window.location.href = '/dashboard';
        return false;
      }),
      catchError(() => {
        window.location.href = '/dashboard';
        return of(false);
      }))
  }
}
