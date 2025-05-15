import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80lComponent } from './form80l.component';

describe('Form80lComponent', () => {
  let component: Form80lComponent;
  let fixture: ComponentFixture<Form80lComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80lComponent]
    });
    fixture = TestBed.createComponent(Form80lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
