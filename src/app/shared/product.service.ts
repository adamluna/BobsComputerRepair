/**
 * Author: Mark Watson
 * Date: 2 Oct 2021
 * Title: BCRS - Product Service
 * Description: Product service file.
 */

import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  // array of services
  constructor() { 
    this.products = [
      {
        id: 100,
        title: 'Password Reset',
        price: 39.99,
        checked: false
      },
      {
        id: 101,
        title: 'Spyware Removal',
        price: 99.99,
        checked: false
      },
      {
        id: 102,
        title: 'RAM Upgrade',
        price: 129.99,
        checked: false
      },
      {
        id: 103,
        title: 'Software Installation',
        price: 49.99,
        checked: false
      },
      {
        id: 104,
        title: 'Tune-up',
        price: 89.99,
        checked: false
      },
      {
        id: 105,
        title: 'Keyboard Cleaning',
        price: 45.00,
        checked: false
      },
      {
        id: 106,
        title: 'Disk Clean-up',
        price: 149.99,
        checked: false
      }
    ]
  }

  // retrieves all products
  getProducts(): Product[] {
    return this.products;
  }
}
