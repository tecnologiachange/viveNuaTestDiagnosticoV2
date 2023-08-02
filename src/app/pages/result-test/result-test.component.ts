import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from 'src/app/services/api/results.service';
import { routeTransitionAnimations } from '../animations';

@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ResultTestComponent implements OnInit{

  public sectionsColors = [ "#2f9ea2", "#9f7eee", "#5325a0", "#311868" ];
  public percent = 50;
  public results: any[] = [];
  private id: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private service: ResultsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.getHability().subscribe((res: any) => { this.results = res; });
  }

  public sendEmit(_item: any){
    this.router.navigateByUrl ('/detail', { state: { id:this.id , _item} ,  });
  }
}
