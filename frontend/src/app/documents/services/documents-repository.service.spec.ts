import { TestBed } from '@angular/core/testing';

import { DocumentsRepositoryService } from './documents-repository.service';

describe('DocumentsRepositoryService', () => {
  let service: DocumentsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
