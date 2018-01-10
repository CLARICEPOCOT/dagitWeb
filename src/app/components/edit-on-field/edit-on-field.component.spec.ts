import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnFieldComponent } from './edit-on-field.component';

describe('EditOnFieldComponent', () => {
  let component: EditOnFieldComponent;
  let fixture: ComponentFixture<EditOnFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOnFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOnFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
