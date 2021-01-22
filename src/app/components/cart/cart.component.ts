import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  constructor(public Productservice:ProductService) { }

  ngOnInit() {
    this.Productservice.setFooterStatus(false);
    this.Productservice.cartProducts$.subscribe((res:any)=>{
      this.itemsInCart = res;
    })
  }

  ngOnDestroy(){
    this.Productservice.setFooterStatus(true);
  }


}
