import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80eComponent } from './form80e.component';

describe('Form80eComponent', () => {
  let component: Form80eComponent;
  let fixture: ComponentFixture<Form80eComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80eComponent]
    });
    fixture = TestBed.createComponent(Form80eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
