import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80gComponent } from './form80g.component';

describe('Form80gComponent', () => {
  let component: Form80gComponent;
  let fixture: ComponentFixture<Form80gComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80gComponent]
    });
    fixture = TestBed.createComponent(Form80gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
