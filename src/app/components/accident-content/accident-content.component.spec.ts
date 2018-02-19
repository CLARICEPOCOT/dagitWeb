import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentContentComponent } from './accident-content.component';

describe('AccidentContentComponent', () => {
  let component: AccidentContentComponent;
  let fixture: ComponentFixture<AccidentContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
