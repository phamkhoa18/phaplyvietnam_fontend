import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80bComponent } from './form80b.component';

describe('Form80bComponent', () => {
  let component: Form80bComponent;
  let fixture: ComponentFixture<Form80bComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80bComponent]
    });
    fixture = TestBed.createComponent(Form80bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
