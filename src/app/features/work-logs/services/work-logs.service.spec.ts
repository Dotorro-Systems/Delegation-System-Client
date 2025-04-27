import { TestBed } from '@angular/core/testing';

import { WorkLogsService } from './work-logs.service';

describe('WorkLogsService', () => {
  let service: WorkLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
