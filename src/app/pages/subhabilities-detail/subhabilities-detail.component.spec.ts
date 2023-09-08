import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhabilitiesDetailComponent } from './subhabilities-detail.component';

describe('SubhabilitiesDetailComponent', () => {
  let component: SubhabilitiesDetailComponent;
  let fixture: ComponentFixture<SubhabilitiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubhabilitiesDetailComponent]
    });
    fixture = TestBed.createComponent(SubhabilitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
