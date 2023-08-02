import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeBarCustomComponent } from './gauge-bar-custom.component';

describe('GaugeBarCustomComponent', () => {
  let component: GaugeBarCustomComponent;
  let fixture: ComponentFixture<GaugeBarCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeBarCustomComponent]
    });
    fixture = TestBed.createComponent(GaugeBarCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
