import { TestBed } from '@angular/core/testing';

import { MockDelegationService } from './mock-delegation.service';

describe('MockDelegationService', () => {
  let service: MockDelegationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDelegationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
