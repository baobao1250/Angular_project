import { Component, Input, Output, EventEmitter } from '@angular/core';
// Import CurrencyPipe để format tiền tệ (Đặc sản của Angular)
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe], // Nhớ import Pipe vào đây nhé
  templateUrl: './product-item.html',
})
export class ProductItem {
  // 1. Nhận dữ liệu từ Cha
  @Input() productItem!: Product

  // 2. Khai báo sự kiện bắn ra (Payload là một con số - giá tiền)
  @Output() addToCart = new EventEmitter<Product>();

  buy() {
    this.addToCart.emit(this.productItem);
  }
}