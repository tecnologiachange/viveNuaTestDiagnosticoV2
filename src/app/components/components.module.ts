import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeBarCustomComponent } from './gauge-bar-custom/gauge-bar-custom.component';
import { BrainCardComponent } from './brain-card/brain-card.component';
import { CategoryComponent } from './category/category.component';
import { AccordionCategoryComponent } from './accordion-category/accordion-category.component';
import { BadgeComponent } from './badge/badge.component';



@NgModule({
  declarations: [
    GaugeBarCustomComponent,
    BrainCardComponent,
    CategoryComponent,
    AccordionCategoryComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GaugeBarCustomComponent,
    BrainCardComponent,
    CategoryComponent,
    AccordionCategoryComponent,
    BadgeComponent
  ]
})
export class ComponentsModule { }
