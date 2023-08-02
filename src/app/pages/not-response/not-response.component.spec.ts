import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotResponseComponent } from './not-response.component';

describe('NotResponseComponent', () => {
  let component: NotResponseComponent;
  let fixture: ComponentFixture<NotResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotResponseComponent]
    });
    fixture = TestBed.createComponent(NotResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
