import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsliderComponent } from './addslider.component';

describe('AddsliderComponent', () => {
  let component: AddsliderComponent;
  let fixture: ComponentFixture<AddsliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsliderComponent]
    });
    fixture = TestBed.createComponent(AddsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
