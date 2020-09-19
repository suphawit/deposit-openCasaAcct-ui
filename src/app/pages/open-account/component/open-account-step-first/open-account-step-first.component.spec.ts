import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStepFirstComponent } from './open-account-step-first.component';

describe('OpenAccountStepFirstComponent', () => {
  let component: OpenAccountStepFirstComponent;
  let fixture: ComponentFixture<OpenAccountStepFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountStepFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
