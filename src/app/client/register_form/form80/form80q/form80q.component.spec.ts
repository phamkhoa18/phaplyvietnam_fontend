import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80qComponent } from './form80q.component';

describe('Form80qComponent', () => {
  let component: Form80qComponent;
  let fixture: ComponentFixture<Form80qComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80qComponent]
    });
    fixture = TestBed.createComponent(Form80qComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
