import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LylichtuphapComponent } from './lylichtuphap.component';

describe('LylichtuphapComponent', () => {
  let component: LylichtuphapComponent;
  let fixture: ComponentFixture<LylichtuphapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LylichtuphapComponent]
    });
    fixture = TestBed.createComponent(LylichtuphapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
