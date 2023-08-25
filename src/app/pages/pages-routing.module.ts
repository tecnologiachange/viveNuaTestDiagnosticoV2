import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';
import { LoadResultsComponent } from './load-results/load-results.component';
import { ResultTestComponent } from './result-test/result-test.component';

const routes: Routes = [
  {
    path: 'response/:id',
    component: LoadResultsComponent,
  },
  {
    path: 'results',
    component: ResultTestComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'detail',
    component: ResultDetailComponent,
    data: { animationState: 'Two' },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotResponseComponent,
    data: { animationState: 'One' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
