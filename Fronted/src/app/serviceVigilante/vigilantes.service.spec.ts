import { TestBed } from '@angular/core/testing';

import { VigilantesService } from './vigilantes.service';

describe('VigilantesService', () => {
  let service: VigilantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigilantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
