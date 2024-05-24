import { TestBed } from '@angular/core/testing';

import { MensagensHandlerService } from './mensagens-handler.service';

describe('MensagensHandlerService', () => {
  let service: MensagensHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagensHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
