import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { ReasonComponent } from './reason/reason.component';
import { HochieuComponent } from './register_form/hochieu/hochieu.component';
import { LylichtuphapComponent } from './register_form/lylichtuphap/lylichtuphap.component';
import { MienthithucComponent } from './register_form/mienthithuc/mienthithuc.component';
import { KhaisinhtrenuocngoaiComponent } from './register_form/khaisinhtrenuocngoai/khaisinhtrenuocngoai.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CountUpModule } from 'ngx-countup';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
// Import các module từ ngx-bootstrap
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokhaiyeucaulylichtuphapComponent } from './register_form/tokhaiyeucaulylichtuphap/tokhaiyeucaulylichtuphap.component';
import { ThuongtruTamtruComponent } from './register_form/thuongtru-tamtru/thuongtru-tamtru.component';
import { Hochieuduoi14Component } from './register_form/hochieuduoi14/hochieuduoi14.component';
import { LoadingchatComponent } from './loadingchat/loadingchat.component';
import OpenAI from 'openai';
import { TokhaisohotichvieckhaisinhComponent } from './register_form/tokhaisohotichvieckhaisinh/tokhaisohotichvieckhaisinh.component';
import { TokhaixincapkhaisinhComponent } from './register_form/tokhaixincapkhaisinh/tokhaixincapkhaisinh.component';
import { GenuineStudentComponent } from './register_form/genuine-student/genuine-student.component';
import { Form80Component } from './register_form/form80/form80.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from './primeng-module';
import { Lylichtuphapv2Component } from './register_form/lylichtuphapv2/lylichtuphapv2.component';
import { QuoctichvietnamComponent } from './register_form/quoctichvietnam/quoctichvietnam.component';
import { Form80aComponent } from './register_form/form80/form80a/form80a.component';
import { Form80bComponent } from './register_form/form80/form80b/form80b.component';
import { Form80cComponent } from './register_form/form80/form80c/form80c.component';
import { Form80dComponent } from './register_form/form80/form80d/form80d.component';
import { Form80eComponent } from './register_form/form80/form80e/form80e.component';
import { Form80fComponent } from './register_form/form80/form80f/form80f.component';
import { Form80gComponent } from './register_form/form80/form80g/form80g.component';
import { Form80hComponent } from './register_form/form80/form80h/form80h.component';
import { Form80iComponent } from './register_form/form80/form80i/form80i.component';
import { Form80jComponent } from './register_form/form80/form80j/form80j.component';
import { Form80kComponent } from './register_form/form80/form80k/form80k.component';
import { Form80lComponent } from './register_form/form80/form80l/form80l.component';
import { Form80qComponent } from './register_form/form80/form80q/form80q.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Hochieuduoi14v2Component } from './register_form/hochieuduoi14v2/hochieuduoi14v2.component';
import { DangkychubaolanhComponent } from './register_form/dangkychubaolanh/dangkychubaolanh.component';
import { Visa600v2Component } from './register_form/visa600v2/visa600v2.component';
import { SkillComponent } from './register_form/skill/skill.component';
import { GiayuyquyenComponent } from './register_form/giayuyquyen/giayuyquyen.component';
import { DangkymoiquanhevochongComponent } from './register_form/dangkymoiquanhevochong/dangkymoiquanhevochong.component';
import { Form888v2Component } from './register_form/form888v2/form888v2.component';
import { Hochieuv2Component } from './register_form/hochieuv2/hochieuv2.component';
import { DitruComponent } from './ditru/ditru.component';
import { LanhsuComponent } from './lanhsu/lanhsu.component';
import { Visa600GuideComponent } from './visa600-guide/visa600-guide.component';
import { SponsorDocumentsComponent } from './sponsor-documents/sponsor-documents.component';
// Import các module từ ngx-bootstrap
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','/form80.json');
}

@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoadingComponent,
    ReasonComponent,
    HochieuComponent,
    LylichtuphapComponent,
    MienthithucComponent,
    KhaisinhtrenuocngoaiComponent,
    SafeHtmlPipe,
    TokhaiyeucaulylichtuphapComponent,
    ThuongtruTamtruComponent,
    Hochieuduoi14Component,
    LoadingchatComponent,
    TokhaisohotichvieckhaisinhComponent,
    TokhaixincapkhaisinhComponent,
    GenuineStudentComponent,
    Form80Component,
    Lylichtuphapv2Component,
    QuoctichvietnamComponent,
    Form80aComponent,
    Form80bComponent,
    Form80cComponent,
    Form80dComponent,
    Form80eComponent,
    Form80fComponent,
    Form80gComponent,
    Form80hComponent,
    Form80iComponent,
    Form80jComponent,
    Form80kComponent,
    Form80lComponent,
    Form80qComponent,
    Hochieuduoi14v2Component,
    DangkychubaolanhComponent,
    Visa600v2Component,
    SkillComponent,
    GiayuyquyenComponent,
    DangkymoiquanhevochongComponent,
    Form888v2Component,
    Hochieuv2Component,
    DitruComponent,
    LanhsuComponent,
    Visa600GuideComponent,
    SponsorDocumentsComponent,
  ],
  providers : [
    OpenAI
  ] ,
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    CountUpModule,
    FontAwesomeModule,
    PrimeNgModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ]
})
export class ClientModule { }
