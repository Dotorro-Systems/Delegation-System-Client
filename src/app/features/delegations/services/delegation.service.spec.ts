import { TestBed } from '@angular/core/testing';

import { DelegationsService } from './delegations.service';

describe('DelegationService', () => {
  let service: DelegationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
