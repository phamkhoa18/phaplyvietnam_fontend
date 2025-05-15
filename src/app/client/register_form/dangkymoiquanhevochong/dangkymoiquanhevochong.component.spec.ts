import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkymoiquanhevochongComponent } from './dangkymoiquanhevochong.component';

describe('DangkymoiquanhevochongComponent', () => {
  let component: DangkymoiquanhevochongComponent;
  let fixture: ComponentFixture<DangkymoiquanhevochongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangkymoiquanhevochongComponent]
    });
    fixture = TestBed.createComponent(DangkymoiquanhevochongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
