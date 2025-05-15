import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { MenuComponent } from './menu/menu.component';
import { AddmenuComponent } from './menu/addmenu/addmenu.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { LoadingComponent } from './loading/loading.component';
import { EditmenuComponent } from './menu/editmenu/editmenu.component';
import { NewsComponent } from './news/news.component';
import { AddnewsComponent } from './news/addnews/addnews.component';
import { EditnewsComponent } from './news/editnews/editnews.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TypesComponent } from './types/types.component';
import { AddtypesComponent } from './types/addtypes/addtypes.component';
import { EdittypesComponent } from './types/edittypes/edittypes.component';
import { SliderComponent } from './slider/slider.component';
import { EditsliderComponent } from './slider/editslider/editslider.component';
import { AddsliderComponent } from './slider/addslider/addslider.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoComponent } from './settings/logo/logo.component';
import { PageIntroduceComponent } from './settings/page-introduce/page-introduce.component';
import { PartnerComponent } from './partner/partner.component';
import { AddpartnerComponent } from './partner/addpartner/addpartner.component';
import { EditpartnerComponent } from './partner/editpartner/editpartner.component';
import { IndexmenuComponent } from './menu/indexmenu/indexmenu.component';
import { PdfComponent } from './pdf/pdf.component';
import { AddpdfComponent } from './pdf/addpdf/addpdf.component';
import { EditpdfComponent } from './pdf/editpdf/editpdf.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    PageComponent,
    MenuComponent,
    AddmenuComponent,
    CategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    LoadingComponent,
    EditmenuComponent,
    NewsComponent,
    AddnewsComponent,
    EditnewsComponent,
    TypesComponent,
    AddtypesComponent,
    EdittypesComponent,
    SliderComponent,
    EditsliderComponent,
    AddsliderComponent,
    SettingsComponent,
    LogoComponent,
    PageIntroduceComponent,
    PartnerComponent,
    AddpartnerComponent,
    EditpartnerComponent,
    IndexmenuComponent,
    PdfComponent,
    AddpdfComponent,
    EditpdfComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule,
    CKEditorModule,
  ]
})
export class AdminModule {

}
