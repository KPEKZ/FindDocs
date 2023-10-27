import { TestBed } from '@angular/core/testing';

import { DocumentsApiAdapterService } from './documents-api-adapter.service';

describe('DocumentsApiAdapterService', () => {
  let service: DocumentsApiAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsApiAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
