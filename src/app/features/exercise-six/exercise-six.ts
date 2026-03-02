// features/exercise-six/exercise-six.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ExpenseService } from '../../shared/services/expense';

@Component({
  selector: 'app-exercise-six',
  standalone: true,
  // Thêm CurrencyPipe và DatePipe để format tiền và ngày tháng cho đẹp
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, NgClass],
  providers: [ExpenseService], // 👈 Ép Service này chỉ sống trong Bài 6
  templateUrl: './exercise-six.html'
})
export class ExerciseSix {
  expenseService = inject(ExpenseService);
  private fb = inject(FormBuilder); // FormBuilder giúp viết form ngắn gọn hơn

  // Khởi tạo Form với các điều kiện Validate (Bắt buộc nhập, số tiền > 0)
  txForm = this.fb.nonNullable.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    type: ['expense' as 'income' | 'expense']
  });

  onSubmit() {
    if (this.txForm.valid) {
      // Lấy toàn bộ giá trị an toàn từ Form và ném cho Service xử lý
      this.expenseService.addTransaction(this.txForm.getRawValue());
      
      // Xóa trắng form sau khi thêm xong, đặt mặc định lại là 'expense' và 0đ
      this.txForm.reset({ type: 'expense', amount: 0, description: '' });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin và số tiền hợp lệ!');
    }
  }
}