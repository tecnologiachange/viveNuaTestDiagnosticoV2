import { Component, Input } from '@angular/core';
import { Hability, Subhability } from 'src/app/models/i.models';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss']
})
export class DetailContentComponent {
  @Input() id: string = '';
  @Input() item: Hability = {} as Hability;

  public getSubhabilidades(): Subhability[] {
    return this.item.subhabilities.map((subhability: Subhability | any) => {
      return {
        ...subhability,
        percent: undefined
      };
    });
  }
}
