import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultTestComponent } from './result-test/result-test.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { NotResponseComponent } from './not-response/not-response.component';

const routes: Routes = [
  {
  path: 'response/:id',
  component: ResultTestComponent,
  data: { animationState: 'One' }
},{
  path: 'detail',
  component: ResultDetailComponent,
  data: { animationState: 'Two' }
},
{
  path: '**',
  pathMatch: 'full',
  component: NotResponseComponent,
  data: { animationState: 'One' }
},];

@NgModule({
  declarations:[
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
