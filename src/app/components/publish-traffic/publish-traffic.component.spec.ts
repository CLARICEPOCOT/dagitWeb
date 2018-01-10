import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTrafficComponent } from './publish-traffic.component';

describe('PublishTrafficComponent', () => {
  let component: PublishTrafficComponent;
  let fixture: ComponentFixture<PublishTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
