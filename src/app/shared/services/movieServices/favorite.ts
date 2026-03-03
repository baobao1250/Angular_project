import { Injectable, signal, effect, afterNextRender } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  favoriteIds = signal<number[]>([]);
  
  // Cờ báo hiệu đã đọc xong LocalStorage chưa
  isLoaded = signal(false); 

  constructor() {
    // 1. Giai đoạn ĐỌC dữ liệu
    afterNextRender(() => {
      const saved = localStorage.getItem('FAV_MOVIES');
      if (saved) {
        this.favoriteIds.set(JSON.parse(saved));
      }
      // Bật cờ báo hiệu: "Đã đọc xong rồi nhé!"
      this.isLoaded.set(true); 
    });

    // 2. Giai đoạn LƯU tự động
    effect(() => {
      const ids = this.favoriteIds();
      // Chỉ lưu đè xuống LocalStorage NẾU đã đọc xong dữ liệu cũ
      if (typeof window !== 'undefined' && this.isLoaded()) {
        localStorage.setItem('FAV_MOVIES', JSON.stringify(ids));
      }
    });
  }

  toggleFavorite(movieId: number) {
    this.favoriteIds.update(currentIds => {
      if (currentIds.includes(movieId)) {
        return currentIds.filter(id => id !== movieId); // Remove if exists
      } else {
        return [...currentIds, movieId]; // Add if not exists
      }
    });
  }

  isFavorite(movieId: number): boolean {
    return this.favoriteIds().includes(movieId);
  }
}