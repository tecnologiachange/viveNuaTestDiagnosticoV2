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
    return Math.round(number* 100);
  }

  public element(): { text: string, color: string, background: string}{
    if (!this.isLabel) return { text: this.round(this.percent)+'%' , color: 'white' , background:'rgba(159, 126, 238, 0.5)' };
    return Utils.getStatus( this.round(this.percent) );
  }
}
