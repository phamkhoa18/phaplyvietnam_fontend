import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorhandleComponent } from './errorhandle.component';

describe('ErrorhandleComponent', () => {
  let component: ErrorhandleComponent;
  let fixture: ComponentFixture<ErrorhandleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorhandleComponent]
    });
    fixture = TestBed.createComponent(ErrorhandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
