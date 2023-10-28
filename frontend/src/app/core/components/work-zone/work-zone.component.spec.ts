import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkZoneComponent } from './work-zone.component';

describe('WorkZoneComponent', () => {
  let component: WorkZoneComponent;
  let fixture: ComponentFixture<WorkZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkZoneComponent]
    });
    fixture = TestBed.createComponent(WorkZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
