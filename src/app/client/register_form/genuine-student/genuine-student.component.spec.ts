import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenuineStudentComponent } from './genuine-student.component';

describe('GenuineStudentComponent', () => {
  let component: GenuineStudentComponent;
  let fixture: ComponentFixture<GenuineStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenuineStudentComponent]
    });
    fixture = TestBed.createComponent(GenuineStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
