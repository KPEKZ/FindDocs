import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPageComponent } from './document-page.component';

describe('DocumentPageComponent', () => {
  let component: DocumentPageComponent;
  let fixture: ComponentFixture<DocumentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPageComponent]
    });
    fixture = TestBed.createComponent(DocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
