import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuongtruTamtruComponent } from './thuongtru-tamtru.component';

describe('ThuongtruTamtruComponent', () => {
  let component: ThuongtruTamtruComponent;
  let fixture: ComponentFixture<ThuongtruTamtruComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThuongtruTamtruComponent]
    });
    fixture = TestBed.createComponent(ThuongtruTamtruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
