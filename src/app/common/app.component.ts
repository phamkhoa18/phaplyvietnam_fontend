import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fontend';

  isLoading = false;  // Biến kiểm soát loading

  constructor(private router: Router) {}

  ngOnInit() {
    // Lắng nghe các sự kiện điều hướng của Router
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;  // Hiển thị loading khi bắt đầu điều hướng
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;  // Ẩn loading sau khi điều hướng hoàn tất
        }, 1000);  // Chờ 3 giây trước khi tắt loading
      }
    });
  }
}
