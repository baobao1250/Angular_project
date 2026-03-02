import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://fakestoreapi.com/products';

  getAllProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }
}