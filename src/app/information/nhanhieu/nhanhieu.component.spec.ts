import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanhieuComponent } from './nhanhieu.component';

describe('NhanhieuComponent', () => {
  let component: NhanhieuComponent;
  let fixture: ComponentFixture<NhanhieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhanhieuComponent]
    });
    fixture = TestBed.createComponent(NhanhieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
