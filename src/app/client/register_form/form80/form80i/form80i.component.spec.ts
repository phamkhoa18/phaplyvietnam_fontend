import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80iComponent } from './form80i.component';

describe('Form80iComponent', () => {
  let component: Form80iComponent;
  let fixture: ComponentFixture<Form80iComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80iComponent]
    });
    fixture = TestBed.createComponent(Form80iComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
