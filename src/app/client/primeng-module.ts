/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgModule } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { SliderModule } from 'primeng/slider';

@NgModule({
    exports: [
      InputTextModule,
      FloatLabelModule,
      StepperModule,
      ButtonModule,
      RadioButtonModule,
      CalendarModule,
      DropdownModule,
      CheckboxModule,
      TooltipModule,
      InputTextareaModule,
      TableModule,
      ToastModule,
      FileUploadModule,
      ConfirmDialogModule,
      ProgressBarModule,
      TagModule,
      InputIconModule,
      IconFieldModule,
      SliderModule,
      CardModule
    ]
})
export class PrimeNgModule { }
