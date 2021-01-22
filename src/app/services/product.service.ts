import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:5000';
  showFooter = new Subject();
  showFooter$ = this.showFooter.asObservable();

  cartProducts = new Subject();
  cartProducts$ = this.cartProducts.asObservable();

  constructor(private http: HttpClient) {}

  fetchBanners() {
    return this.http.get(this.baseUrl + '/banners');
  }

  fetchCategories() {
    return this.http.get(this.baseUrl + '/categories');
  }

  fetchProducts() {
    return this.http.get(this.baseUrl + '/products');
  }

  setFooterStatus(value) {
    this.showFooter.next(value);
  }

  addtoCart(productId) {
    return this.http.post(this.baseUrl + '/addToCart', productId);
  }

  addedtocart(item) {
    let products = [];
    //fetch products from local storage
    if (localStorage.getItem('products')) {
      products = JSON.parse(localStorage.getItem('products'));
    }
    //if no product in cart then push item with qty set as 1
    if (products.length === 0) {
      item.quantity = 1;
      products.push(item);
    }
    //if there r product then check if item to be added exist or not.
    else {
      const itemIndex = products.findIndex((product) => product.id === item.id);
      // If item not in cart, push it with qty as 1
      if (itemIndex === -1) {
        item.quantity = 1;
        products.push(item);
      }
      // If item exist then increase the qty by 1.
      else {
        products[itemIndex].quantity = products[itemIndex].quantity + 1;
      }
    }
    localStorage.setItem('products', JSON.stringify(products));
    this.cartProducts.next(products);
  }

  removedfromcart(item) {
    let products = [];
    //fetch products from local storage
    if (localStorage.getItem('products')) {
      products = JSON.parse(localStorage.getItem('products'));
    }
    //find index of item whose qty to be decremented or removed.
    const itemIndex = products.findIndex((product) => product.id === item.id);
   if(products[itemIndex].quantity > 1){
     products[itemIndex].quantity = products[itemIndex].quantity - 1;
     localStorage.setItem('products', JSON.stringify(products));
     this.cartProducts.next(products);
   } else{
     const updatedProducts = products.filter(product => product.id !== item.id );
     localStorage.setItem('products', JSON.stringify(updatedProducts));
     this.cartProducts.next(updatedProducts);
   }
  }
}
