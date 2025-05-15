import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoctichvietnamComponent } from './quoctichvietnam.component';

describe('QuoctichvietnamComponent', () => {
  let component: QuoctichvietnamComponent;
  let fixture: ComponentFixture<QuoctichvietnamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoctichvietnamComponent]
    });
    fixture = TestBed.createComponent(QuoctichvietnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
