import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { HochieuComponent } from './register_form/hochieu/hochieu.component';
import { MienthithucComponent } from './register_form/mienthithuc/mienthithuc.component';
import { KhaisinhtrenuocngoaiComponent } from './register_form/khaisinhtrenuocngoai/khaisinhtrenuocngoai.component';
import { ThuongtruTamtruComponent } from './register_form/thuongtru-tamtru/thuongtru-tamtru.component';
import { Hochieuduoi14Component } from './register_form/hochieuduoi14/hochieuduoi14.component';
import { TokhaisohotichvieckhaisinhComponent } from './register_form/tokhaisohotichvieckhaisinh/tokhaisohotichvieckhaisinh.component';
import { TokhaixincapkhaisinhComponent } from './register_form/tokhaixincapkhaisinh/tokhaixincapkhaisinh.component';
import { GenuineStudentComponent } from './register_form/genuine-student/genuine-student.component';
import { Form80Component } from './register_form/form80/form80.component';
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
import { stepaccessGuard } from '../guards/stepaccess.guard';
import { Hochieuduoi14v2Component } from './register_form/hochieuduoi14v2/hochieuduoi14v2.component';
import { DangkychubaolanhComponent } from './register_form/dangkychubaolanh/dangkychubaolanh.component';
import { Visa600v2Component } from './register_form/visa600v2/visa600v2.component';
import { SkillComponent } from './register_form/skill/skill.component';
import { GiayuyquyenComponent } from './register_form/giayuyquyen/giayuyquyen.component';
import { DangkymoiquanhevochongComponent } from './register_form/dangkymoiquanhevochong/dangkymoiquanhevochong.component';
import { Form888v2Component } from './register_form/form888v2/form888v2.component';
import { Hochieuv2Component } from './register_form/hochieuv2/hochieuv2.component';
import { LanhsuComponent } from './lanhsu/lanhsu.component';
import { DitruComponent } from './ditru/ditru.component';
import { NhanhieuComponent } from '../information/nhanhieu/nhanhieu.component';
import { Visa600GuideComponent } from './visa600-guide/visa600-guide.component';
import { SponsorDocumentsComponent } from './sponsor-documents/sponsor-documents.component';



const routes: Routes = [
    {path : "" , component : ClientComponent , children : [
        {path : "" , component : HomeComponent },
        {path : "dang-ky/ho-chieu" , component : HochieuComponent},
        {path : "dang-ky/ho-chieu-v2" , component : Hochieuv2Component},
        {path : "dang-ky/ho-chieu-duoi-14" , component : Hochieuduoi14Component},
        {path : "dang-ky/ho-chieu-duoi-14-v2" , component : Hochieuduoi14v2Component},
        {path : 'dang-ky/to-khai-ly-lich-tu-phap' , component : Lylichtuphapv2Component},
        {path : 'dang-ky/to-khai-quoc-tich-viet-nam' , component : QuoctichvietnamComponent},
        {path : 'dang-ky/xac-nhan-tam-tru-thuong-tru' , component : ThuongtruTamtruComponent},
        {path : 'dang-ky/mien-thi-thuc' , component : MienthithucComponent},
        {path : 'dang-ky/giay-khai-sinh-tre-em-viet-nam-o-nuoc-ngoai' , component : KhaisinhtrenuocngoaiComponent},
        {path : 'dang-ky/to-khai-xin-cap-khai-sinh', component : TokhaixincapkhaisinhComponent},
        {path : 'dang-ky/form888' , component : Form888v2Component},
        // module form 80
        {
          path: 'dang-ky/form80',
          component: Form80Component,
          children: [
            { path: 'a', component: Form80aComponent , canActivate: [stepaccessGuard] },
            { path: 'b', component: Form80bComponent  , canActivate: [stepaccessGuard]   },
            { path: 'c', component: Form80cComponent , canActivate: [stepaccessGuard]   },
            { path: 'd', component: Form80dComponent , canActivate: [stepaccessGuard]   },
            { path: 'e', component: Form80eComponent , canActivate: [stepaccessGuard]   },
            { path: 'f', component: Form80fComponent , canActivate: [stepaccessGuard]   },
            { path: 'g', component: Form80gComponent , canActivate: [stepaccessGuard]   },
            { path: 'h', component: Form80hComponent , canActivate: [stepaccessGuard]   },
            { path: 'i', component: Form80iComponent , canActivate: [stepaccessGuard]   },
            { path: 'j', component: Form80jComponent , canActivate: [stepaccessGuard]   },
            { path: 'k', component: Form80kComponent , canActivate: [stepaccessGuard]   },
            { path: 'l', component: Form80lComponent , canActivate: [stepaccessGuard]   },
            { path: 'q', component: Form80qComponent , canActivate: [stepaccessGuard]   },
            { path: '', redirectTo: 'a', pathMatch: 'full' } // Redirect to the first step by default
          ]
        },
        {path : 'genuinestudent' , component : GenuineStudentComponent},
        {path : 'dangkychubaolanh' , component : DangkychubaolanhComponent},
        {path : 'dang-ky/visa600' , component : Visa600v2Component} ,
        {path : 'dang-ky/to-khai-ho-tich-viec-khai-sinh' , component : TokhaisohotichvieckhaisinhComponent},
        {path : 'danh-sach-tay-nghe-cot-loi-csol' , component : SkillComponent} ,
        {path : 'dang-ky/giay-uy-quyen' , component : GiayuyquyenComponent} ,
        {path : 'dang-ky/moi-quan-he-vo-chong' , component : DangkymoiquanhevochongComponent} ,
        {path : 'thong-tin/dang-ky-nhan-hieu' , component : NhanhieuComponent} ,
        { path: 'lanhsu', component: LanhsuComponent },
        { path: 'ditru', component: DitruComponent },
        { path: 'huong-dan/gio-to-co-nguoi-nha-bao-lanh-visa600', component: Visa600GuideComponent },
        { path: 'huong-dan/giay-to-nguoi-bao-lanh-visa600', component: SponsorDocumentsComponent },
        {path : '' , redirectTo : '/' , pathMatch : 'full'}
    ]}
];



@NgModule({
  imports: [  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
