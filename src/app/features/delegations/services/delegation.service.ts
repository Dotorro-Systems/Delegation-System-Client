import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {Delegation} from '../interfaces/delegation';

@Injectable({
  providedIn: 'root'
})
export class DelegationService extends ApiService {

  public getDelegations(): Observable<Delegation[]> {
    return this.getAll<Delegation>("delegations");
  }

  public getById(id: number): Observable<Delegation> {
    return this.get<Delegation>(`delegations/${id}`);
  }

  public addDelegation(delegation: Delegation): Observable<Delegation> {
    return this.post<Delegation>("delegations/", delegation);
  }

  public putDelegation(delegationId: number, updatedDelegation: Delegation): Observable<Delegation> {
    return this.put<Delegation>(`delegations/${delegationId}`, updatedDelegation);
  }

  public deleteDelegation(delegationId: number): Observable<Object> {
    return this.delete<Object>(`delegations/${delegationId}`);
  }
}
