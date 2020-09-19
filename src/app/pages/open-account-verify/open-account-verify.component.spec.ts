import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountVerifyComponent } from './open-account-verify.component';

describe('OpenAccountVerifyComponent', () => {
  let component: OpenAccountVerifyComponent;
  let fixture: ComponentFixture<OpenAccountVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
