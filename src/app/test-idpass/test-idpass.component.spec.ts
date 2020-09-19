import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIdpassComponent } from './test-idpass.component';

describe('TestIdpassComponent', () => {
  let component: TestIdpassComponent;
  let fixture: ComponentFixture<TestIdpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIdpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIdpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
