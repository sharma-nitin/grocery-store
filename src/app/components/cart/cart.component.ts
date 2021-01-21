import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemInCart = 1;
  constructor(private Productservice:ProductService) { }

  ngOnInit() {
    this.Productservice.setFooterStatus(false);
  }

  ngOnDestroy(){
    this.Productservice.setFooterStatus(true);
  }

}
