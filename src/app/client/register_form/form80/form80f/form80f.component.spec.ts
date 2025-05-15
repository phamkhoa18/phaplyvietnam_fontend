import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80fComponent } from './form80f.component';

describe('Form80fComponent', () => {
  let component: Form80fComponent;
  let fixture: ComponentFixture<Form80fComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80fComponent]
    });
    fixture = TestBed.createComponent(Form80fComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
