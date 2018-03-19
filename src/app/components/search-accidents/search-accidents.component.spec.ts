import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccidentsComponent } from './search-accidents.component';

describe('SearchAccidentsComponent', () => {
  let component: SearchAccidentsComponent;
  let fixture: ComponentFixture<SearchAccidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAccidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
