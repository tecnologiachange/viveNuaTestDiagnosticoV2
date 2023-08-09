import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hability } from 'src/app/models/i.models';

@Component({
  selector: 'app-accordion-category',
  templateUrl: './accordion-category.component.html',
  styleUrls: ['./accordion-category.component.scss']
})
export class AccordionCategoryComponent {

  @Input() habilities: Hability[] = [];
  @Output() event = new EventEmitter<any>();

  getSummaryPercent(subhabilities: any[]): number {
    let percent = 0;
    subhabilities.forEach(subhabilidad => {
      percent += subhabilidad.percent;
    });
    return percent / (subhabilities.length === 0 ? 1 : subhabilities.length);
  }

  public roundNumber(num: number): number {
    return Math.round(num);
  }

  onEmitEvent(item: any){
    this.event.emit(item);
  }
}
