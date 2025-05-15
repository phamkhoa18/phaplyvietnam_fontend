import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientModule } from './client/client.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthSGuard } from './guards/auth-s.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pdf/pdf.module').then(m => m.PdfModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthSGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'  // Tùy chọn này đảm bảo cuộn lên đầu trang khi điều hướng
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
