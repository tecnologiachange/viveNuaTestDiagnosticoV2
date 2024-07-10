import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMinimalComponent } from './load-minimal.component';

describe('LoadMinimalComponent', () => {
  let component: LoadMinimalComponent;
  let fixture: ComponentFixture<LoadMinimalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMinimalComponent]
    });
    fixture = TestBed.createComponent(LoadMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
