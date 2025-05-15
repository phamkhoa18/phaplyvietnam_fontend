import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HochieuComponent } from './hochieu.component';

describe('HochieuComponent', () => {
  let component: HochieuComponent;
  let fixture: ComponentFixture<HochieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HochieuComponent]
    });
    fixture = TestBed.createComponent(HochieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
