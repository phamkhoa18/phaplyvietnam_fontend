import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80cComponent } from './form80c.component';

describe('Form80cComponent', () => {
  let component: Form80cComponent;
  let fixture: ComponentFixture<Form80cComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80cComponent]
    });
    fixture = TestBed.createComponent(Form80cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
