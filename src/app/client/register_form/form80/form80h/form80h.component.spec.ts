import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80hComponent } from './form80h.component';

describe('Form80hComponent', () => {
  let component: Form80hComponent;
  let fixture: ComponentFixture<Form80hComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80hComponent]
    });
    fixture = TestBed.createComponent(Form80hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
