import { TestBed } from '@angular/core/testing';

import { DocumentsAdapterService } from './documents-adapter.service';

describe('DocumentsAdapterService', () => {
  let service: DocumentsAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
