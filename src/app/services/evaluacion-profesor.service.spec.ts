import { TestBed } from '@angular/core/testing';

import { EvaluacionProfesorService } from './evaluacion-profesor.service';

describe('EvaluacionProfesorService', () => {
  let service: EvaluacionProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
