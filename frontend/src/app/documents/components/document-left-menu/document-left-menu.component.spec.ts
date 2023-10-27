import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLeftMenuComponent } from './document-left-menu.component';

describe('DocumentLeftMenuComponent', () => {
  let component: DocumentLeftMenuComponent;
  let fixture: ComponentFixture<DocumentLeftMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentLeftMenuComponent]
    });
    fixture = TestBed.createComponent(DocumentLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
