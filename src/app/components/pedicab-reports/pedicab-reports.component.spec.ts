import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedicabReportsComponent } from './pedicab-reports.component';

describe('PedicabReportsComponent', () => {
  let component: PedicabReportsComponent;
  let fixture: ComponentFixture<PedicabReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedicabReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedicabReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
