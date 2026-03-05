import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { lanhSuForms } from '../../lanhsu';
import { diTruForms } from '../../ditru';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInRight', [
      state('closed', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('closed <=> open', [
        animate('260ms ease-in-out')
      ])
    ]),
    trigger('fadeIn', [
      state('closed', style({
        opacity: '0',
        transform: 'translateY(-8px) scale(0.95)',
        pointerEvents: 'none'
      })),
      state('open', style({
        opacity: '1',
        transform: 'translateY(0) scale(1)',
        pointerEvents: 'auto'
      })),
      transition('closed => open', [
        animate('200ms ease-out')
      ]),
      transition('open => closed', [
        animate('150ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  lang: string = 'vi';
  isMobileMenuOpen: boolean = false;
  isConsularMenuOpen: boolean = false;
  isImmigrationMenuOpen: boolean = false;
  showConsularDropdown: boolean = false;
  showImmigrationDropdown: boolean = false;


  consularItems: any[] = lanhSuForms;
  immigrationItems: any[] = diTruForms;

  constructor(
    public api: ApiService,
    private translate: TranslateService,
    private form80service: Form80serviceService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form80service.currentLanguage.subscribe((value) => {
      this.translate.use(value);
      this.lang = value;
    });

  }

  onLanguageToggle(lang: string) {
    this.form80service.changeLanguage(lang);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isConsularMenuOpen = false;
      this.isImmigrationMenuOpen = false;
    }
  }

  toggleConsularMenu() {
    this.isConsularMenuOpen = !this.isConsularMenuOpen;
    if (this.isConsularMenuOpen) {
      this.isImmigrationMenuOpen = false;
    }
  }

  toggleImmigrationMenu() {
    this.isImmigrationMenuOpen = !this.isImmigrationMenuOpen;
    if (this.isImmigrationMenuOpen) {
      this.isConsularMenuOpen = false;
    }
  }

  toggleConsularDropdown() {
    this.showConsularDropdown = !this.showConsularDropdown;
    if (this.showConsularDropdown) {
      this.showImmigrationDropdown = false;
    }
  }

  toggleImmigrationDropdown() {
    this.showImmigrationDropdown = !this.showImmigrationDropdown;
    if (this.showImmigrationDropdown) {
      this.showConsularDropdown = false;
    }
  }
}