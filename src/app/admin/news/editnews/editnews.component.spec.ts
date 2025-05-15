import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewsComponent } from './editnews.component';

describe('EditnewsComponent', () => {
  let component: EditnewsComponent;
  let fixture: ComponentFixture<EditnewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditnewsComponent]
    });
    fixture = TestBed.createComponent(EditnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
