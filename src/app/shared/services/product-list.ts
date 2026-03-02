import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable()
export class ProductService {
  // Trong thực tế, bạn sẽ inject HttpClient vào đây để gọi API thật:
  // constructor(private http: HttpClient) {}

  searchProducts(term: string) {
    // Logic gọi API thật sẽ trông như thế này:
    // return this.http.get<string[]>(`https://api.myweb.com/products?q=${term}`);

    // Còn đây là logic giả lập (fake API) được dời từ Component sang:
    const database = ['Apple iPhone', 'Apple Macbook', 'Banana', 'Orange', 'Samsung Galaxy'];
    const filtered = database.filter(p => p.toLowerCase().includes(term.toLowerCase()));
    
    return of(filtered).pipe(delay(500)); 
  }
}