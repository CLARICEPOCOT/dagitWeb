import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrafficComponent } from './add-traffic.component';

describe('AddTrafficComponent', () => {
  let component: AddTrafficComponent;
  let fixture: ComponentFixture<AddTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
