import { TestBed } from '@angular/core/testing';

import { MateriaDictadaService } from './materia-dictada.service';

describe('MateriaDictadaService', () => {
  let service: MateriaDictadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaDictadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
