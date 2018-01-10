import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishParkingComponent } from './publish-parking.component';

describe('PublishParkingComponent', () => {
  let component: PublishParkingComponent;
  let fixture: ComponentFixture<PublishParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
