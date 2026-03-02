import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Khởi tạo giá trị ngay lập tức: Nếu ở Trình duyệt thì đọc kho, nếu ở Server thì false
  isLoggedIn = signal<boolean>(this.checkInitialState());

  private checkInitialState(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('ACCESS_TOKEN');
    }
    return false;
  }

  login(username: string, pass: string) {
    const safeString = encodeURIComponent(`real-token-for-${username}-999`);
    const mockApiResponse = { token: btoa(safeString) };

    return of(mockApiResponse).pipe(
      delay(800),
      tap(response => {
        localStorage.setItem('ACCESS_TOKEN', response.token);
        this.isLoggedIn.set(true);
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('ACCESS_TOKEN');
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('ACCESS_TOKEN');
    }
    this.isLoggedIn.set(false);
  }
}