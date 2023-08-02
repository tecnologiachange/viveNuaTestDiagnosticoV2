import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion-category',
  templateUrl: './accordion-category.component.html',
  styleUrls: ['./accordion-category.component.scss']
})
export class AccordionCategoryComponent {

  @Input() habilities: any[] = [];
  @Output() event = new EventEmitter<any>();

  getSummaryPercent(subhabilities: any[]): number {
    let percent = 0;
    subhabilities.forEach(subhabilidad => {
      percent += subhabilidad.percent;
    });
    return percent / subhabilities.length;
  }

  onEmitEvent(item: any){
    this.event.emit(item);
  }
}
