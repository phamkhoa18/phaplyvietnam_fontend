import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpdfComponent } from './detailpdf.component';

describe('DetailpdfComponent', () => {
  let component: DetailpdfComponent;
  let fixture: ComponentFixture<DetailpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailpdfComponent]
    });
    fixture = TestBed.createComponent(DetailpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
