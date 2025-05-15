import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepaccessGuard } from './stepaccess.guard';

describe('stepaccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepaccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
