import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayuyquyenComponent } from './giayuyquyen.component';

describe('GiayuyquyenComponent', () => {
  let component: GiayuyquyenComponent;
  let fixture: ComponentFixture<GiayuyquyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiayuyquyenComponent]
    });
    fixture = TestBed.createComponent(GiayuyquyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
