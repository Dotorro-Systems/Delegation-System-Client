import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationsComponent } from './delegations.component';

describe('DelegationsComponent', () => {
  let component: DelegationsComponent;
  let fixture: ComponentFixture<DelegationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
