import { TestBed } from '@angular/core/testing';

import { DocumentsTypeRepositoryService } from './documents-type-repository.service';

describe('DocumentsTypeRepositoryService', () => {
  let service: DocumentsTypeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsTypeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
