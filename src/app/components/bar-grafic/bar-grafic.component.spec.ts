import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraficComponent } from './bar-grafic.component';

describe('BarGraficComponent', () => {
  let component: BarGraficComponent;
  let fixture: ComponentFixture<BarGraficComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarGraficComponent]
    });
    fixture = TestBed.createComponent(BarGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
