import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsComponent } from './addnews.component';

describe('AddnewsComponent', () => {
  let component: AddnewsComponent;
  let fixture: ComponentFixture<AddnewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewsComponent]
    });
    fixture = TestBed.createComponent(AddnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
