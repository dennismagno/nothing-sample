import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public products: Product[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'api/product').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
}

interface Product {
  productId: string;
  name: string;
  description: string;
  unitPrice: number;
  maximumQuantity: number;
}
