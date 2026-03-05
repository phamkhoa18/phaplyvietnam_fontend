import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanhsuComponent } from './lanhsu.component';

describe('LanhsuComponent', () => {
  let component: LanhsuComponent;
  let fixture: ComponentFixture<LanhsuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanhsuComponent]
    });
    fixture = TestBed.createComponent(LanhsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
