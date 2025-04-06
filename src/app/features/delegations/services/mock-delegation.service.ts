import { Injectable } from '@angular/core';
import {Delegation} from '../interfaces/delegation';
import { Observable, of} from 'rxjs';
import {MOCK_DELEGATIONS} from '../../mocks/mock-delegations';

@Injectable({
  providedIn: 'root'
})
export class MockDelegationService {
  getDelegations(): Observable<Delegation[]> {
    return of(MOCK_DELEGATIONS);
  }

  getById(id: number): Observable<Delegation> {
    return of(MOCK_DELEGATIONS.filter(d => d.id == id)[0]);
    }
}
