import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultTestComponent } from './result-test/result-test.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';

@NgModule({
  declarations: [
    ResultTestComponent,
    ResultDetailComponent,
    NotResponseComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
