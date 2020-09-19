import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepFourthComponent } from './open-account-step-fourth.component';

describe('OpenAccountStepFourthComponent', () => {
  let component: OpenAccountStepFourthComponent;
  let fixture: ComponentFixture<OpenAccountStepFourthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepFourthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
