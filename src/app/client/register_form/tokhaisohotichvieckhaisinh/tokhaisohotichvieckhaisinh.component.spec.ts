import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokhaisohotichvieckhaisinhComponent } from './tokhaisohotichvieckhaisinh.component';

describe('TokhaisohotichvieckhaisinhComponent', () => {
  let component: TokhaisohotichvieckhaisinhComponent;
  let fixture: ComponentFixture<TokhaisohotichvieckhaisinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokhaisohotichvieckhaisinhComponent]
    });
    fixture = TestBed.createComponent(TokhaisohotichvieckhaisinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
