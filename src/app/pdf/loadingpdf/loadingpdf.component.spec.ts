import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingpdfComponent } from './loadingpdf.component';

describe('LoadingpdfComponent', () => {
  let component: LoadingpdfComponent;
  let fixture: ComponentFixture<LoadingpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingpdfComponent]
    });
    fixture = TestBed.createComponent(LoadingpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
