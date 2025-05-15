import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIntroduceComponent } from './page-introduce.component';

describe('PageIntroduceComponent', () => {
  let component: PageIntroduceComponent;
  let fixture: ComponentFixture<PageIntroduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageIntroduceComponent]
    });
    fixture = TestBed.createComponent(PageIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
