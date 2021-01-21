import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl = "http://localhost:5000";
showFooter = new Subject();
showFooter$ = this.showFooter.asObservable();
  constructor(private http:HttpClient) { }

fetchBanners(){
  return this.http.get(this.baseUrl + '/banners')
}

fetchCategories(){
  return this.http.get(this.baseUrl + '/categories')
}

fetchProducts(){
  return this.http.get(this.baseUrl + '/products')
}

setFooterStatus(value){
  this.showFooter.next(value);
}

}
