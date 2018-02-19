import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedicabReportContentComponent } from './pedicab-report-content.component';

describe('PedicabReportContentComponent', () => {
  let component: PedicabReportContentComponent;
  let fixture: ComponentFixture<PedicabReportContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedicabReportContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedicabReportContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
