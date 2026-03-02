import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './shared/services/auth'; // Import Service
import { CartService } from './shared/services/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,CurrencyPipe], 
  templateUrl: './app.html',
})
export class App {
  // 1. Inject AuthService và Router
  authService = inject(AuthService);
  private router = inject(Router);

  title = 'Angular Playground';
  cartService = inject(CartService);

  // 2. Viết 1 hàm xử lý chung cho cái nút ở Sidebar
  handleAuthClick() {
    // Nếu đang đăng nhập -> Bấm vào là Đăng xuất -> Đá về trang chủ
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/']); 
    } 
    // Nếu chưa đăng nhập -> Bấm vào là Chuyển sang trang Login
    else {
      this.router.navigate(['/login']);
    }
  }
}