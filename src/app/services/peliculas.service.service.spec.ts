import { TestBed } from '@angular/core/testing';

import { PeliculasService } from './peliculas.service.service';

describe('PeliculasServiceService', () => {
  let service: PeliculasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
