import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkychubaolanhComponent } from './dangkychubaolanh.component';

describe('DangkychubaolanhComponent', () => {
  let component: DangkychubaolanhComponent;
  let fixture: ComponentFixture<DangkychubaolanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangkychubaolanhComponent]
    });
    fixture = TestBed.createComponent(DangkychubaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
