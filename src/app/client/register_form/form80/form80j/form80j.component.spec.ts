import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80jComponent } from './form80j.component';

describe('Form80jComponent', () => {
  let component: Form80jComponent;
  let fixture: ComponentFixture<Form80jComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80jComponent]
    });
    fixture = TestBed.createComponent(Form80jComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
