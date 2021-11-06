import { TestBed } from '@angular/core/testing';

import { RudeService } from './rude.service';

describe('RudeService', () => {
  let service: RudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
