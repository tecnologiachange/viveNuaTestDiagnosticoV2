import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subhability } from 'src/app/models/i.models';

@Component({
  selector: 'app-subhabilities-detail',
  templateUrl: './subhabilities-detail.component.html',
  styleUrls: ['./subhabilities-detail.component.scss']
})
export class SubhabilitiesDetailComponent {

  extras: { sub: Subhability[] , name: string } = { sub: [] , name: '' };

  constructor( private router: Router) { 
    this.extras = this.router.getCurrentNavigation()!.extras.state as { sub: Subhability[] , name: string };
  }
}
