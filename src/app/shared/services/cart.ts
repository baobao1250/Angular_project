import { Injectable, signal } from '@angular/core'; // Import signal
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalPrice = signal<number>(0); 

  addToCart(item: Product) {
    let finalPrice = item.price;
    if (item.discount) {
      finalPrice = item.price - (item.price * item.discount / 100);
    }
    
    // 2. Cập nhật Signal bằng hàm update() (Giống setCount(prev => prev + 1) của React)
    this.totalPrice.update(currentTotal => currentTotal + finalPrice);
  }

  removeFromCart(item: Product) {
    let finalPrice = item.price;
    if (item.discount) {
      finalPrice = item.price - (item.price * item.discount / 100);
    }

    this.totalPrice.update(currentTotal => {
      if (currentTotal >= finalPrice) return currentTotal - finalPrice;
      return 0;
    });
  }
}