import { Component } from '@angular/core';
// Đảm bảo đường dẫn import đúng với cấu trúc thư mục của bạn
import { ProductListComponent } from '../../shared/components/product-list/product-list';

@Component({
  selector: 'app-exercise-four',
  imports: [ProductListComponent],
  templateUrl: './exercise-four.html',
  styleUrl: './exercise-four.css',
})
export class ExerciseFour {

}
