import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Hability, Subhability } from 'src/app/models/i.models';

@Component({
  selector: 'app-accordion-category',
  templateUrl: './accordion-category.component.html',
  styleUrls: ['./accordion-category.component.scss']
})
export class AccordionCategoryComponent {

  @Input() habilities: Hability[] = [];
  @Input() subhalities: Subhability[] = [];
  @Input() isCurriculumInteligente = false;
  @Input() extras: any;
  @Output() event = new EventEmitter<any>();
  @Output() buttonEvent = new EventEmitter<any>();
  @Output() buttonCurriculum = new EventEmitter<any>();

  constructor( private router: Router ) {}

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

  openModal(){
    this.buttonEvent.emit();
  }

  openCurriculum(){
    this.buttonCurriculum.emit();
  }
}
