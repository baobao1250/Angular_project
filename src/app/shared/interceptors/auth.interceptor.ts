import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

// Dùng HttpInterceptorFn thay vì class implement HttpInterceptor
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   // 1. Nhờ Angular "bơm" AuthService vào
//   const authService = inject(AuthService);
//   const token = authService.getToken();

//   if (token) {
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     // 3. Cho bản sao đi tiếp lên Server
//     return next(clonedRequest);
//   }

//   // 4. Nếu không có Token (chưa đăng nhập), cho request gốc đi tiếp bình thường
//   return next(req);
// };

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Chỉ gắn Token nếu KHÔNG PHẢI là API của fakestore
  const isMyApi = !req.url.includes('fakestoreapi.com');

  if (token && isMyApi) { // 👈 Phải có isMyApi ở đây
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedRequest);
  }

  return next(req);
};