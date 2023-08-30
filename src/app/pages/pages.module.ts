import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultTestComponent } from './result-test/result-test.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';
import { LoadResultsComponent } from './load-results/load-results.component';
import { RecommendComponent } from './recommend/recommend.component';

@NgModule({
  declarations: [
    ResultTestComponent,
    ResultDetailComponent,
    NotResponseComponent,
    LoadResultsComponent,
    RecommendComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
