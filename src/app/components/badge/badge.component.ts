import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @Input() percent: number = 0;

  public round(number: number): number {
    return Math.round(number* 100);
  }
}
