import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultTestComponent } from './result-test/result-test.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';
import { LoadResultsComponent } from './load-results/load-results.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SubhabilitiesDetailComponent } from './subhabilities-detail/subhabilities-detail.component';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';
import { FormsModule } from '@angular/forms';
import { ReportCurriculumComponent } from './report-curriculum/report-curriculum.component';

@NgModule({
  declarations: [
    ResultTestComponent,
    ResultDetailComponent,
    NotResponseComponent,
    LoadResultsComponent,
    RecommendComponent,
    SubhabilitiesDetailComponent,
    CreateCurriculumComponent,
    ReportCurriculumComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
