import { TestBed } from '@angular/core/testing';

import { MockWorkLogService } from './mock-work-log.service';

describe('MockWorkLogService', () => {
  let service: MockWorkLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockWorkLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
