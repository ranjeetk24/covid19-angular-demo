import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {path: '', component: ChartComponent},
  {path: 'table', component: TableComponent},
  {path: 'charts', component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
