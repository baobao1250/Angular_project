import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true // Rất quan trọng trong kiến trúc mới
})
export class DiscountPipe implements PipeTransform {
  // value: giá trị gốc nằm bên trái dấu | (VD: price)
  // percent: tham số nằm bên phải dấu : (VD: 20)
  transform(value: number, percent: number = 0): number {
    if (!value) return 0;
    
    const amountToDeduct = (value * percent) / 100;
    return value - amountToDeduct;
  }
}