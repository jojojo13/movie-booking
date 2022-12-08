import { TestBed } from '@angular/core/testing';

import { BlockedUserGuard } from './blocked-user.guard';

describe('BlockedUserGuard', () => {
  let guard: BlockedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
