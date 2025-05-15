import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfRoutingModule } from './pdf-routing.module';
import { PdfComponent } from './pdf/pdf.component';
import { HpdfComponent } from './pdf/hpdf/hpdf.component';
import { FpdfComponent } from './pdf/fpdf/fpdf.component';
import { DetailpdfComponent } from './detailpdf/detailpdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import { LoadingComponent } from './loading/loading.component';
import { LoadingpdfComponent } from './loadingpdf/loadingpdf.component';


@NgModule({
  declarations: [
    PdfComponent,
    HpdfComponent,
    FpdfComponent,
    DetailpdfComponent,
    LoadingComponent,
    LoadingpdfComponent
  ],
  imports: [
    CommonModule,
    PdfRoutingModule,
    PdfViewerModule, // <- Add PdfViewerModule to imports
  ]
})
export class PdfModule { }
