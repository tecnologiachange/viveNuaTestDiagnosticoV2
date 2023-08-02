import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gauge-bar-custom',
  templateUrl: './gauge-bar-custom.component.html',
  styleUrls: ['./gauge-bar-custom.component.scss']
})
export class GaugeBarCustomComponent {

  @ViewChild('gaugeBar') gaugeBar: any;
  @Input() secciones: string[] = [];
  @Input() percent: number = 0;
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
  ngAfterViewInit(): void {
    const widthContainer = this.gaugeBar.nativeElement.offsetWidth;
    const marginLeft = parseInt( (widthContainer * (this.percent / 100) ) + '' );
    this.marginleft = marginLeft - 21;
  }
}
