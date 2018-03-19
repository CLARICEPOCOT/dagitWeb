import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPedicabComponent } from './search-pedicab.component';

describe('SearchPedicabComponent', () => {
  let component: SearchPedicabComponent;
  let fixture: ComponentFixture<SearchPedicabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPedicabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPedicabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
