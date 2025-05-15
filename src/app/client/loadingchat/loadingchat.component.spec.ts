import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingchatComponent } from './loadingchat.component';

describe('LoadingchatComponent', () => {
  let component: LoadingchatComponent;
  let fixture: ComponentFixture<LoadingchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingchatComponent]
    });
    fixture = TestBed.createComponent(LoadingchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
