import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeEditingFormDialogComponent } from './document-type-editing-form-dialog.component';

describe('DocumentTypeEditingFormDialogComponent', () => {
  let component: DocumentTypeEditingFormDialogComponent;
  let fixture: ComponentFixture<DocumentTypeEditingFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentTypeEditingFormDialogComponent]
    });
    fixture = TestBed.createComponent(DocumentTypeEditingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
