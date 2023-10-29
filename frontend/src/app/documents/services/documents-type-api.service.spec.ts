import { TestBed } from '@angular/core/testing';

import { DocumentsTypeApiService } from './documents-type-api.service';

describe('DocumentsTypeApiService', () => {
  let service: DocumentsTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
