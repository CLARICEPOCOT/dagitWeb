import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeskComponent } from './edit-desk.component';

describe('EditDeskComponent', () => {
  let component: EditDeskComponent;
  let fixture: ComponentFixture<EditDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
