import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepThirdComponent } from './open-account-step-third.component';

describe('OpenAccountStepThirdComponent', () => {
  let component: OpenAccountStepThirdComponent;
  let fixture: ComponentFixture<OpenAccountStepThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
