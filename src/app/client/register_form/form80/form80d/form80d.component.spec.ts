import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80dComponent } from './form80d.component';

describe('Form80dComponent', () => {
  let component: Form80dComponent;
  let fixture: ComponentFixture<Form80dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80dComponent]
    });
    fixture = TestBed.createComponent(Form80dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
