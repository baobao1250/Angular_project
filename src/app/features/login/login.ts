import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
   templateUrl: './login.html',
})
export class Login {
  authService = inject(AuthService);
  private http = inject(HttpClient);

  // Form data
  username = '';
  password = '';

  handleLogin() {
    if (!this.username) return alert('Vui lòng nhập tên!');
    
    // Gọi hàm login từ Service
    this.authService.login(this.username, this.password).subscribe(() => {
      console.log('Đăng nhập thành công, token đã lưu!');
    });
  }

  callProtectedApi() {
    // API này bay ra ngoài sẽ tự động bị Interceptor chặn lại và nhét Token vào
    this.http.get('https://jsonplaceholder.typicode.com/users/1').subscribe({
      next: (res) => console.log('✅ API Thành công:', res),
      error: (err) => console.error('❌ Lỗi:', err)
    });
  }
}