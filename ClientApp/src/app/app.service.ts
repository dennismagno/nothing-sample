import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    rootURL = '/api';

    getProducts() {
        return this.http.get<Product[]>(this.rootURL + '/Product/');
    }
}

interface Product {
    productId: string;
    name: string;
    description: string;
    unitPrice: number;
    maximumQuantity: number;
}