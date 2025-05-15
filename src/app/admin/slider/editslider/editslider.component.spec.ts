import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsliderComponent } from './editslider.component';

describe('EditsliderComponent', () => {
  let component: EditsliderComponent;
  let fixture: ComponentFixture<EditsliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditsliderComponent]
    });
    fixture = TestBed.createComponent(EditsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
