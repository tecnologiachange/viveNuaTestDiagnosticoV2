import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainCardComponent } from './brain-card.component';

describe('BrainCardComponent', () => {
  let component: BrainCardComponent;
  let fixture: ComponentFixture<BrainCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrainCardComponent]
    });
    fixture = TestBed.createComponent(BrainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
