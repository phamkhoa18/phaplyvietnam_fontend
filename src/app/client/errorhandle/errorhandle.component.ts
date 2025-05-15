import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-errorhandle',
  templateUrl: './errorhandle.component.html',
  styleUrls: ['./errorhandle.component.scss']
})
export class ErrorhandleComponent {

  @Input() form: FormGroup;
  @Input() controlName: string;

  hasError(): boolean {
    const control = this.form.get(this.controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(): string {
    const control = this.form.get(this.controlName);
    console.log(control);

    if (control.hasError('required')) {
      return 'This field is required.';
    }
    // Add other error messages here if needed
    return '';
  }

}
