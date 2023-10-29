import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentKewordEditingFormDialogComponent } from './document-keword-editing-form-dialog.component';

describe('DocumentKewordEditingFormDialogComponent', () => {
  let component: DocumentKewordEditingFormDialogComponent;
  let fixture: ComponentFixture<DocumentKewordEditingFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentKewordEditingFormDialogComponent]
    });
    fixture = TestBed.createComponent(DocumentKewordEditingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
