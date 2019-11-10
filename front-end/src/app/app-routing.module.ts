import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';


const routes: Routes = [
  {path: '', pathMatch: 'full',component: SearchPageComponent},
  {path: 'result', component: ResultsPageComponent},
  {path: '**',component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
