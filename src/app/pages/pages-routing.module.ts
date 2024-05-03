import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';
import { LoadResultsComponent } from './load-results/load-results.component';
import { ResultTestComponent } from './result-test/result-test.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SubhabilitiesDetailComponent } from './subhabilities-detail/subhabilities-detail.component';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';
import { ReportCurriculumComponent } from './report-curriculum/report-curriculum.component';

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
    path: 'recommend',
    component: RecommendComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'detail',
    component: ResultDetailComponent,
    data: { animationState: 'Two' },
  },
  {
    path: 'subhabilities',
    component: SubhabilitiesDetailComponent,
    data: { animationState: 'Two' },
  },
  {
    path: 'create-curriculum',
    component: CreateCurriculumComponent,
    data: { animationState: 'Two' },
  },
  {
    path: 'report/:token',
    component: ReportCurriculumComponent,
    data: { animationState: 'One' },
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
