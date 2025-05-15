import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const lang = route.params['lang']; // Lấy tham số ngôn ngữ từ route

    // Kiểm tra xem lang có hợp lệ không
    if (!lang) {
      // Nếu không có lang, chuyển hướng về ngôn ngữ mặc định 'vi'
      const newUrl = `/vi${state.url}`;
      this.router.navigateByUrl(newUrl);
      return false; // Ngăn không cho vào route này
    }

    // Chỉ cho phép 'vi' và 'en'
    if (lang !== 'vi' && lang !== 'en') {
      const newUrl = `/vi${state.url}`; // Chuyển hướng về lang mặc định nếu lang không hợp lệ
      this.router.navigateByUrl(newUrl);
      return false;
    }

    return true; // Cho phép vào route nếu có lang hợp lệ
  }
}
