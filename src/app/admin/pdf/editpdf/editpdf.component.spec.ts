import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpdfComponent } from './editpdf.component';

describe('EditpdfComponent', () => {
  let component: EditpdfComponent;
  let fixture: ComponentFixture<EditpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpdfComponent]
    });
    fixture = TestBed.createComponent(EditpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
