import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80aComponent } from './form80a.component';

describe('Form80aComponent', () => {
  let component: Form80aComponent;
  let fixture: ComponentFixture<Form80aComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80aComponent]
    });
    fixture = TestBed.createComponent(Form80aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
