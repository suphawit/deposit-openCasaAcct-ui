import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepSummaryComponent } from './open-account-step-summary.component';

describe('OpenAccountStepSummaryComponent', () => {
  let component: OpenAccountStepSummaryComponent;
  let fixture: ComponentFixture<OpenAccountStepSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
