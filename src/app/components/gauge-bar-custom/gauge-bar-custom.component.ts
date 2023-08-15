import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Hability } from 'src/app/models/i.models';

@Component({
  selector: 'app-gauge-bar-custom',
  templateUrl: './gauge-bar-custom.component.html',
  styleUrls: ['./gauge-bar-custom.component.scss']
})
export class GaugeBarCustomComponent implements OnChanges {
 

  @ViewChild('gaugeBar') gaugeBar: any;
  @Input() item!: Hability;
  @Input() id: string = '';
  @Input() secciones: string[] = [];
  @Input() percent: number = 0;
  @Input() title: string = '';
  @Output() sendEmit: EventEmitter<Hability> = new EventEmitter<Hability>();
  public marginleft: number = 0;

  getStyle(index: number): any {
    let object:any = {
      'background-color': this.secciones[index],
      'width': (100 / this.secciones.length) + '%',
      'height': '100%',
      'display': 'inline-block'
    };
    
    if (index === 0) {
      object['border-top-left-radius'] = '15px';
      object['border-bottom-left-radius'] = '15px';
    }
    if(index === this.secciones.length - 1) {
      object['border-top-right-radius'] = '15px';
      object['border-bottom-right-radius'] = '15px';
    }
    return object;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paint();
  }
  
  private paint(){
    const widthContainer = this.gaugeBar.nativeElement.offsetWidth;
    const marginLeft = parseInt( (widthContainer * ( this.round(this.percent) / 100) ) + '' );
    this.marginleft = marginLeft - 21;
  }

  ngAfterViewInit(): void {
    this.paint();
  }

  public round(number: number): number {
    return Math.round(number* 100);
  }

  public more(){
    this.sendEmit.emit(this.item);
  }
}
