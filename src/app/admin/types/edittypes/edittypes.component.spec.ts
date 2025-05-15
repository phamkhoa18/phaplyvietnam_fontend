import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittypesComponent } from './edittypes.component';

describe('EdittypesComponent', () => {
  let component: EdittypesComponent;
  let fixture: ComponentFixture<EdittypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittypesComponent]
    });
    fixture = TestBed.createComponent(EdittypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
