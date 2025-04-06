import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationPanelComponent } from './delegation-panel.component';

describe('DelegationsComponent', () => {
  let component: DelegationPanelComponent;
  let fixture: ComponentFixture<DelegationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
