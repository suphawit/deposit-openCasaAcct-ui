import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountSummaryComponent } from './open-account-summary.component';

describe('OpenAccountSummaryComponent', () => {
  let component: OpenAccountSummaryComponent;
  let fixture: ComponentFixture<OpenAccountSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
