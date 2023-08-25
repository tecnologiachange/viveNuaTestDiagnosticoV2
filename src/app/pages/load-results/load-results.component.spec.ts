import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadResultsComponent } from './load-results.component';

describe('LoadResultsComponent', () => {
  let component: LoadResultsComponent;
  let fixture: ComponentFixture<LoadResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadResultsComponent]
    });
    fixture = TestBed.createComponent(LoadResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
