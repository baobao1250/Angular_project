import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Lấy công cụ kiểm tra môi trường

  // 1. TRÊN SERVER: Nhắm mắt cho qua để tránh bị đá văng sai quy trình
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  // 2. TRÊN TRÌNH DUYỆT: Kiểm tra gắt gao
  if (authService.isLoggedIn()) {
    return true; // Có thẻ, cho qua!
  } else {
    console.log('Ê đứng lại! Chưa đăng nhập mà đòi vào à?');
    // Nên đá về trang /login thay vì trang chủ nhé
    router.navigate(['/login']); 
    return false; // Chặn!
  }
};