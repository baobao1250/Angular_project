import { Component, OnInit, signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs';
import { ProductService } from '../../services/product-list';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  searchControl = new FormControl('');
  products = signal<string[]>([]);
  isLoading = signal<boolean>(false);

  private productService = inject(ProductService);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        this.isLoading.set(true);

        return this.productService.searchProducts(term || '');
      })
    ).subscribe((results) => {
      this.products.set(results);
      this.isLoading.set(false);
    });
  }
}