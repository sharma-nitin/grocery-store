import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartCount = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')).length : 0;
  constructor(private Productservice:ProductService) { }

  ngOnInit() {
    this.Productservice.cartProducts$.subscribe((res:any)=>{
      this.cartCount = res.length;
    })
  }

}
