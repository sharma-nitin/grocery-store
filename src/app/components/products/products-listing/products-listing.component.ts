import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss'],
})
export class ProductsListingComponent implements OnInit {
  @Input() products;
  @Input() selectedCategoryId;

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {}

  //addtoCart will trigger with item to be added in cart when Buy now is clicked.
  addtoCart(item) {
    this.productservice.addtoCart(item.id).subscribe((res: any) => {
      if (res.response === 'Success') {
        this.productservice.addedtocart(item);
      }
    });
  }
}
