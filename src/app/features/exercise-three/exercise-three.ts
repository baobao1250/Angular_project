import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductItem } from '../../shared/components/product-item/product-item';
import { CartService } from '../../shared/services/cart';
import { ProductService } from '../../shared/services/product'; // Import Service gọi API
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-exercise-three',
  standalone: true,
  imports: [ProductItem],
  templateUrl: './exercise-three.html',
})
// Nhớ implements OnInit để code chuẩn chỉ
export class ExerciseThree implements OnInit {
  cartService = inject(CartService);
  productService = inject(ProductService);

  // 1. Biến Signal chứa danh sách sản phẩm, ban đầu là mảng rỗng
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true); // Trạng thái loading

  // 2. Hàm ngOnInit chạy 1 lần duy nhất khi Component vừa render xong (Giống useEffect(..., []))
  ngOnInit() {
    // Gọi hàm từ Service, và bắt buộc phải có .subscribe() thì API mới thực sự được bắn đi
    this.productService.getAllProducts().subscribe({
      next: (dataFromApi) => {
        // Mapping dữ liệu từ API thành chuẩn Interface của mình
        const mappedData: Product[] = dataFromApi.map(item => ({
          id: item.id,
          name: item.title,       // API trả về 'title', mình đổi thành 'name'
          price: item.price * 25000, // Đổi USD sang VND cho vui
          discount: Math.random() > 0.5 ? 10 : undefined,
          imageUrl: item.image
        }));

        // Đổ dữ liệu vào Signal
        this.products.set(mappedData);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Lỗi rồi đại vương ơi:', err);
        this.isLoading.set(false);
      }
    });
  }

  handleAddToCart(item: Product) {
    this.cartService.addToCart(item);
  }

  handleRemoveFromCart(item: Product) {
    this.cartService.removeFromCart(item);
  }
}