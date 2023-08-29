import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarcharStackedComponent } from './horizontal-barchar-stacked.component';

describe('HorizontalBarcharStackedComponent', () => {
  let component: HorizontalBarcharStackedComponent;
  let fixture: ComponentFixture<HorizontalBarcharStackedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalBarcharStackedComponent]
    });
    fixture = TestBed.createComponent(HorizontalBarcharStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
