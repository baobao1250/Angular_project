import { Injectable, signal, computed, effect, afterNextRender } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable() 
export class ExpenseService {
  transactions = signal<Transaction[]>([]);
  
  // 🛡️ 1. Tạo khiên bảo vệ: Đánh dấu xem đã đọc xong LocalStorage chưa
  private isLoaded = false;

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

  balance = computed(() => this.totalIncome() - this.totalExpense());

  constructor() {
    // 1. Giai đoạn ĐỌC dữ liệu
    afterNextRender(() => {
      const savedData = localStorage.getItem('EXPENSES_DATA');
      if (savedData) {
        const parsedData: Transaction[] = JSON.parse(savedData).map((item: any) => ({
          ...item,
          date: new Date(item.date) 
        }));
        this.transactions.set(parsedData);
      }
      
      // 🛡️ 2. Báo hiệu: Đã đọc xong dữ liệu an toàn, hạ khiên xuống!
      this.isLoaded = true; 
    });

    // 2. Giai đoạn LƯU dữ liệu
    effect(() => {
      const dataToSave = this.transactions();
      
      // 🛡️ 3. Kiểm tra: Chỉ cho phép lưu nếu đang ở Trình duyệt VÀ đã đọc xong dữ liệu cũ
      if (typeof window !== 'undefined' && this.isLoaded) {
        localStorage.setItem('EXPENSES_DATA', JSON.stringify(dataToSave));
        console.log('💾 Đã tự động lưu dữ liệu xuống LocalStorage!');
      }
    });
  }
  
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