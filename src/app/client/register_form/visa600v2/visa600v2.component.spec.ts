import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visa600v2Component } from './visa600v2.component';

describe('Visa600v2Component', () => {
  let component: Visa600v2Component;
  let fixture: ComponentFixture<Visa600v2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Visa600v2Component]
    });
    fixture = TestBed.createComponent(Visa600v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
