import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditingFormDialogComponent } from './document-editing-form-dialog.component';

describe('DocumentEditingFormDialogComponent', () => {
  let component: DocumentEditingFormDialogComponent;
  let fixture: ComponentFixture<DocumentEditingFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentEditingFormDialogComponent]
    });
    fixture = TestBed.createComponent(DocumentEditingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
