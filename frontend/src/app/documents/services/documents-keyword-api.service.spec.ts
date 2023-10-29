import { TestBed } from '@angular/core/testing';

import { DocumentsKeywordApiService } from './documents-keyword-api.service';

describe('DocumentsKeywordApiService', () => {
  let service: DocumentsKeywordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsKeywordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
