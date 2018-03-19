import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViolationComponent } from './search-violation.component';

describe('SearchViolationComponent', () => {
  let component: SearchViolationComponent;
  let fixture: ComponentFixture<SearchViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
