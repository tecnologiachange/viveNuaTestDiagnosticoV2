import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionCategoryComponent } from './accordion-category.component';

describe('AccordionCategoryComponent', () => {
  let component: AccordionCategoryComponent;
  let fixture: ComponentFixture<AccordionCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionCategoryComponent]
    });
    fixture = TestBed.createComponent(AccordionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
