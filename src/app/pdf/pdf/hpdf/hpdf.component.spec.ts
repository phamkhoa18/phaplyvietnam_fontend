import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpdfComponent } from './hpdf.component';

describe('HpdfComponent', () => {
  let component: HpdfComponent;
  let fixture: ComponentFixture<HpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HpdfComponent]
    });
    fixture = TestBed.createComponent(HpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
