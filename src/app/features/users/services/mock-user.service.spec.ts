import { TestBed } from '@angular/core/testing';

import { MockUserService } from './mock-user.service';

describe('MockUserService', () => {
  let service: MockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
