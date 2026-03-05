import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitruComponent } from './ditru.component';

describe('DitruComponent', () => {
  let component: DitruComponent;
  let fixture: ComponentFixture<DitruComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DitruComponent]
    });
    fixture = TestBed.createComponent(DitruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
