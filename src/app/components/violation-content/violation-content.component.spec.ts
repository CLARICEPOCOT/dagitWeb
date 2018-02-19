import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationContentComponent } from './violation-content.component';

describe('ViolationContentComponent', () => {
  let component: ViolationContentComponent;
  let fixture: ComponentFixture<ViolationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
