import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishAnnouncementComponent } from './publish-announcement.component';

describe('PublishAnnouncementComponent', () => {
  let component: PublishAnnouncementComponent;
  let fixture: ComponentFixture<PublishAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
