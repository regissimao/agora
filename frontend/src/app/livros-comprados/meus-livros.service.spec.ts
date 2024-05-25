import { TestBed } from '@angular/core/testing';

import { MeusLivrosService } from '../livros-comprados/meus-livros.service';

describe('MeusLivrosService', () => {
  let service: MeusLivrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusLivrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
