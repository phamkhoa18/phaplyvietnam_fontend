import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80Component } from './form80.component';

describe('Form80Component', () => {
  let component: Form80Component;
  let fixture: ComponentFixture<Form80Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80Component]
    });
    fixture = TestBed.createComponent(Form80Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
