// features/exercise-six/expense.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable() // Khai báo trống thế này để lát nữa ta cung cấp nó riêng cho Bài 6
export class ExpenseService {
  // 1. Dữ liệu gốc: Danh sách giao dịch (Signal)
  transactions = signal<Transaction[]>([]);

  // 2. Dữ liệu phái sinh (Computed): Tự động tính toán mỗi khi mảng gốc thay đổi
  totalIncome = computed(() => 
    this.transactions()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  totalExpense = computed(() => 
    this.transactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  // Số dư = Tổng thu - Tổng chi
  balance = computed(() => this.totalIncome() - this.totalExpense());

  // 3. Các hàm hành động (Actions)
  addTransaction(data: { description: string; amount: number; type: 'income' | 'expense' }) {
    const newTx: Transaction = {
      ...data,
      id: Math.random().toString(36).substring(2, 9), // Tạo ID ngẫu nhiên
      date: new Date()
    };
    
    // update() là hàm của Signal để cập nhật giá trị mới dựa trên giá trị cũ
    this.transactions.update(currentTxs => [newTx, ...currentTxs]);
  }

  deleteTransaction(id: string) {
    this.transactions.update(currentTxs => currentTxs.filter(t => t.id !== id));
  }
}