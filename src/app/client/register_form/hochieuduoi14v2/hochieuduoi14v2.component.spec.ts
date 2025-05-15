import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hochieuduoi14v2Component } from './hochieuduoi14v2.component';

describe('Hochieuduoi14v2Component', () => {
  let component: Hochieuduoi14v2Component;
  let fixture: ComponentFixture<Hochieuduoi14v2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hochieuduoi14v2Component]
    });
    fixture = TestBed.createComponent(Hochieuduoi14v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
