import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepEndComponent } from './open-account-step-end.component';

describe('OpenAccountStepEndComponent', () => {
  let component: OpenAccountStepEndComponent;
  let fixture: ComponentFixture<OpenAccountStepEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
