import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokhaixincapkhaisinhComponent } from './tokhaixincapkhaisinh.component';

describe('TokhaixincapkhaisinhComponent', () => {
  let component: TokhaixincapkhaisinhComponent;
  let fixture: ComponentFixture<TokhaixincapkhaisinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokhaixincapkhaisinhComponent]
    });
    fixture = TestBed.createComponent(TokhaixincapkhaisinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
