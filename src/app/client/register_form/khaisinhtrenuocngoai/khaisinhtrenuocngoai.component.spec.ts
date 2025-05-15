import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaisinhtrenuocngoaiComponent } from './khaisinhtrenuocngoai.component';

describe('KhaisinhtrenuocngoaiComponent', () => {
  let component: KhaisinhtrenuocngoaiComponent;
  let fixture: ComponentFixture<KhaisinhtrenuocngoaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhaisinhtrenuocngoaiComponent]
    });
    fixture = TestBed.createComponent(KhaisinhtrenuocngoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
