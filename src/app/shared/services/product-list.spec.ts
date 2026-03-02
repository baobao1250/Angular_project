import { TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';

describe('ProductList', () => {
  let service: ProductList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
