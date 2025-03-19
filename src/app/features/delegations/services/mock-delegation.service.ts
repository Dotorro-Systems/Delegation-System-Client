import { Injectable } from '@angular/core';
import {Delegation} from '../interfaces/delegation';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDelegationService {
  private mockDelegations: Delegation[] = [
    {
      id: 1,
      title: 'Project Workshop in Berlin',
      origin: 'Warsaw, Poland',
      destination: 'Berlin, Germany',
      start_date: new Date("2024-07-12"),
      end_date: new Date("2024-07-19"),
    },
    {
      id: 2,
      title: "Tech Conference in San Francisco",
      origin: "London, UK",
      destination: "San Francisco, USA",
      start_date: new Date("2024-05-15"),
      end_date: new Date("2024-05-20")
    },
    {
      id: 3,
      title: "Project Workshop in Tokyo",
      origin: "Paris, France",
      destination: "Tokyo, Japan",
      start_date: new Date("2024-06-05"),
      end_date: new Date("2024-06-10")
    }
  ]

  getDelegations(): Observable<Delegation[]> {
    return of(this.mockDelegations);
  }
}
