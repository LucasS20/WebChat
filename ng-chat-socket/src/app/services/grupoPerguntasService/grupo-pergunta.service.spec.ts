import { TestBed } from '@angular/core/testing';

import { GrupoPerguntaService } from './grupo-pergunta.service';

describe('GrupoPerguntaService', () => {
  let service: GrupoPerguntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoPerguntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
