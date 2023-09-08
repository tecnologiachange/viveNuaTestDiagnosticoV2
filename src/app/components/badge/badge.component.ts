import { Component, Input } from '@angular/core';
import { Utils } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @Input() percent: number = 0;
  @Input() isLabel: boolean = false;

  private round(number: number): number {
    number = (number >= 0 && number <= 1 ) ? number * 100 : number;
    return Math.round(number);
  }

  public element(): { text: string, color: string, background: string}{
    return Utils.getStatus( this.round(this.percent) , this.isLabel );
  }
}
