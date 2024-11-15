import { TestBed } from '@angular/core/testing';

import { PuntocontrolService } from './puntocontrol.service';

describe('PuntocontrolService', () => {
  let service: PuntocontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntocontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
