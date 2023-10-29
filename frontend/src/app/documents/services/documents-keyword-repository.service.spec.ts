import { TestBed } from '@angular/core/testing';

import { DocumentsKeywordRepositoryService } from './documents-keyword-repository.service';

describe('DocumentsKeywordRepositoryService', () => {
  let service: DocumentsKeywordRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsKeywordRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
