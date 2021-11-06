import { TestBed } from '@angular/core/testing';

import { EstudianteMateriaService } from './estudiante-materia.service';

describe('EstudianteMateriaService', () => {
  let service: EstudianteMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
