import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.component.html',
  styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent implements OnInit {
@Input() itemsInCart;

  constructor(public Productservice: ProductService) { }

  ngOnInit(): void {
  }

}
