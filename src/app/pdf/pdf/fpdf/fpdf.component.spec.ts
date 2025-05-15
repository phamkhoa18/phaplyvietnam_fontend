import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpdfComponent } from './fpdf.component';

describe('FpdfComponent', () => {
  let component: FpdfComponent;
  let fixture: ComponentFixture<FpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FpdfComponent]
    });
    fixture = TestBed.createComponent(FpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
