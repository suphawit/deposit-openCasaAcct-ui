import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepFifthComponent } from './open-account-step-fifth.component';

describe('OpenAccountStepFifthComponent', () => {
  let component: OpenAccountStepFifthComponent;
  let fixture: ComponentFixture<OpenAccountStepFifthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepFifthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepFifthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
