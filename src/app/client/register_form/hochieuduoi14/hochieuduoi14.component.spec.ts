import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hochieuduoi14Component } from './hochieuduoi14.component';

describe('Hochieuduoi14Component', () => {
  let component: Hochieuduoi14Component;
  let fixture: ComponentFixture<Hochieuduoi14Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hochieuduoi14Component]
    });
    fixture = TestBed.createComponent(Hochieuduoi14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
