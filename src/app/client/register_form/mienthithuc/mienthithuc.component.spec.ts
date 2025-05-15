import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MienthithucComponent } from './mienthithuc.component';

describe('MienthithucComponent', () => {
  let component: MienthithucComponent;
  let fixture: ComponentFixture<MienthithucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MienthithucComponent]
    });
    fixture = TestBed.createComponent(MienthithucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
