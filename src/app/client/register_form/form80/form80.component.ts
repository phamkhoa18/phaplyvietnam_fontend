import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Form80serviceService } from 'src/app/services/form80service.service';
import {TranslateService} from '@ngx-translate/core';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-form80',
  templateUrl: './form80.component.html',
  styleUrls: ['./form80.component.scss']
})
export class Form80Component implements OnInit{
  currentParams: string = '' ;
  currentStep: number = 1; // Bước hiện tại
  totalSteps: number = 13; // Tổng số bước (bao gồm các bước từ a đến q)
  steps = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'q']; // Mảng các đường dẫn
  isLoading: Boolean = false ;
  private sub: any;
  constructor(
    private fb: FormBuilder ,
    private form80service: Form80serviceService,
    private route: ActivatedRoute, private router: Router,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentParams = this.route.firstChild?.snapshot.url[0]?.path;
        this.currentStep = this.steps.indexOf(currentParams) + 1;
        this.form80service.setCurrentStep(this.currentStep);
      }
    });
    this.form80service.getCurrentStep(); // Initialize current step value
    this.form80service.currentLanguage.subscribe((value) => {
        this.translate.use(value);
    })
    this.form80service.getLoading().subscribe((valueLoading) => {
      this.isLoading = valueLoading ;
    })
  }

  onComponentActivate(component: any): void {
    if (component.next) {
      component.next.subscribe(() => this.goToNextStep());
    }
    if (component.back) {
      component.back.subscribe(() => this.goToPreviousStep());
    }
  }

  goToNextStep(): void {
    if (this.form80service.isStepCompleted(this.currentStep)) {
      const nextStepIndex = this.currentStep; // Tính chỉ số của bước kế tiếp
      if (nextStepIndex < this.totalSteps) {
        const nextStep = this.steps[nextStepIndex];
        this.form80service.setCurrentStep(nextStepIndex + 1) ;
        console.log(this.form80service.getCurrentStep());
        if (nextStep) {
          console.log('Navigating to:', `/dang-ky/form80/${nextStep}`);
          this.router.navigate([`/dang-ky/form80/${nextStep}`]).then(success => {
            if (success) {
              console.log('Navigation to next step successful');
            } else {
              console.error('Navigation to next step failed');
            }
          });
        } else {
          console.error('Invalid step');
        }
      }
    }
  }

  goToPreviousStep(): void {
    const prevStepIndex = this.currentStep - 2; // Tính chỉ số của bước trước đó
    if (prevStepIndex >= 0) {
      const prevStep = this.steps[prevStepIndex];
      this.router.navigate([`/dang-ky/form80/${prevStep}`]);
    }
  }
}
