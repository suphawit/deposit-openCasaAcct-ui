import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepSecondComponent } from './open-account-step-second.component';

describe('OpenAccountStepSecondComponent', () => {
  let component: OpenAccountStepSecondComponent;
  let fixture: ComponentFixture<OpenAccountStepSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
