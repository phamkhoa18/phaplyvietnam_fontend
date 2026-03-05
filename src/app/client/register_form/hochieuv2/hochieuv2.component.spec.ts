import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hochieuv2Component } from './hochieuv2.component';

describe('Hochieuv2Component', () => {
  let component: Hochieuv2Component;
  let fixture: ComponentFixture<Hochieuv2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hochieuv2Component]
    });
    fixture = TestBed.createComponent(Hochieuv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
