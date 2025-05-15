import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokhaiyeucaulylichtuphapComponent } from './tokhaiyeucaulylichtuphap.component';

describe('TokhaiyeucaulylichtuphapComponent', () => {
  let component: TokhaiyeucaulylichtuphapComponent;
  let fixture: ComponentFixture<TokhaiyeucaulylichtuphapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokhaiyeucaulylichtuphapComponent]
    });
    fixture = TestBed.createComponent(TokhaiyeucaulylichtuphapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
