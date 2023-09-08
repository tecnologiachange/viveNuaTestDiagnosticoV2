import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

    @Input() percent: number = 0;
    @Input() tittle: string = '';
    @Input() description: string = '';
    @Input() isLabel: boolean = false;

}
