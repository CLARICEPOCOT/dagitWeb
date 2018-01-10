import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnfieldComponent } from './add-onfield.component';

describe('AddOnfieldComponent', () => {
  let component: AddOnfieldComponent;
  let fixture: ComponentFixture<AddOnfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
