import { TestBed } from '@angular/core/testing';

import { MockDepartmentService } from './mock-department.service';

describe('MockDepartmentService', () => {
  let service: MockDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
