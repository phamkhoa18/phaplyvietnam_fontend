import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputautocompleteComponent } from './inputautocomplete.component';

describe('InputautocompleteComponent', () => {
  let component: InputautocompleteComponent;
  let fixture: ComponentFixture<InputautocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputautocompleteComponent]
    });
    fixture = TestBed.createComponent(InputautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
