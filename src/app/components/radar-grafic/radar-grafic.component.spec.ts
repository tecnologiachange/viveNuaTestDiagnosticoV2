import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarGraficComponent } from './radar-grafic.component';

describe('RadarGraficComponent', () => {
  let component: RadarGraficComponent;
  let fixture: ComponentFixture<RadarGraficComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadarGraficComponent]
    });
    fixture = TestBed.createComponent(RadarGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
