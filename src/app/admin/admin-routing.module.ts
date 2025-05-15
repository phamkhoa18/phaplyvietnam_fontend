import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './page/page.component';
import { AddmenuComponent } from './menu/addmenu/addmenu.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { EditmenuComponent } from './menu/editmenu/editmenu.component';
import { NewsComponent } from './news/news.component';
import { AddnewsComponent } from './news/addnews/addnews.component';
import { EditnewsComponent } from './news/editnews/editnews.component';
import { TypesComponent } from './types/types.component';
import { AddtypesComponent } from './types/addtypes/addtypes.component';
import { EdittypesComponent } from './types/edittypes/edittypes.component';
import { SliderComponent } from './slider/slider.component';
import { AddsliderComponent } from './slider/addslider/addslider.component';
import { EditsliderComponent } from './slider/editslider/editslider.component';
import { SettingsComponent } from './settings/settings.component';
import { PartnerComponent } from './partner/partner.component';
import { AddpartnerComponent } from './partner/addpartner/addpartner.component';
import { EditpartnerComponent } from './partner/editpartner/editpartner.component';
import { IndexmenuComponent } from './menu/indexmenu/indexmenu.component';
import { PdfComponent } from './pdf/pdf.component';
import { AddpdfComponent } from './pdf/addpdf/addpdf.component';
import { EditpdfComponent } from './pdf/editpdf/editpdf.component';

const routes: Routes = [
  {path : "" , component:AdminComponent , children : [
      {path : "home" , component : HomeComponent},
      {path : "menu" , component : MenuComponent},
      {path : 'settings' , component : SettingsComponent},
      {path : "menu/add" , component : AddmenuComponent},
      {path : "menu/index" , component : IndexmenuComponent},
      {path : "menu/edit/:id" , component : EditmenuComponent},
      {path : 'category' , component : CategoryComponent} ,
      {path : "category/add" , component : AddcategoryComponent} ,
      {path : "category/edit/:id" , component : EditcategoryComponent} ,
      {path : "news" , component : NewsComponent},
      {path : "news/add" , component : AddnewsComponent},
      {path : "news/edit/:id" , component : EditnewsComponent},
      {path : 'typesnews' , component : TypesComponent},
      {path : 'typesnews/add' , component : AddtypesComponent},
      {path : 'typesnews/edit/:id' , component : EdittypesComponent},
      {path : 'sliders' , component : SliderComponent},
      {path : 'sliders/add' , component : AddsliderComponent},
      {path : 'sliders/edit/:id' , component : EditsliderComponent},
      {path : 'pdfs' , component : PdfComponent},
      {path : 'pdfs/add' , component : AddpdfComponent},
      {path : 'pdfs/edit/:id' , component : EditpdfComponent},
      {path : 'partner' , component : PartnerComponent},
      {path : 'partner/add' , component : AddpartnerComponent},
      {path : 'partner/edit/:id' , component : EditpartnerComponent},
      { path: '',   redirectTo: '/admin/home', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
