import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lylichtuphapv2Component } from './lylichtuphapv2.component';

describe('Lylichtuphapv2Component', () => {
  let component: Lylichtuphapv2Component;
  let fixture: ComponentFixture<Lylichtuphapv2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lylichtuphapv2Component]
    });
    fixture = TestBed.createComponent(Lylichtuphapv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
