import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentReportsComponent } from './accident-reports.component';

describe('AccidentReportsComponent', () => {
  let component: AccidentReportsComponent;
  let fixture: ComponentFixture<AccidentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
