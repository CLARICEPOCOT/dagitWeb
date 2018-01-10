import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeskTmoComponent } from './add-desk-tmo.component';

describe('AddDeskTmoComponent', () => {
  let component: AddDeskTmoComponent;
  let fixture: ComponentFixture<AddDeskTmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeskTmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeskTmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
