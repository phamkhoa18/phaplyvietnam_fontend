import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form888v2Component } from './form888v2.component';

describe('Form888v2Component', () => {
  let component: Form888v2Component;
  let fixture: ComponentFixture<Form888v2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form888v2Component]
    });
    fixture = TestBed.createComponent(Form888v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
