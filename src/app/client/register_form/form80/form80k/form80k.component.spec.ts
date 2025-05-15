import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form80kComponent } from './form80k.component';

describe('Form80kComponent', () => {
  let component: Form80kComponent;
  let fixture: ComponentFixture<Form80kComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form80kComponent]
    });
    fixture = TestBed.createComponent(Form80kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
