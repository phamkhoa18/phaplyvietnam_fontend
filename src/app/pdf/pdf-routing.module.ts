import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { DetailpdfComponent } from './detailpdf/detailpdf.component';

const routes: Routes = [
  {path : '' , component : PdfComponent , children : [
     {path : 'detail/:name' , component : DetailpdfComponent},
     {path : '' , redirectTo : '/detail/:name' , pathMatch : 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfRoutingModule { }
