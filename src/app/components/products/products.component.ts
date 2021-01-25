import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  Categories = [];
  products = [];
  selectedCategoryId = '';
  selectedCategorykey = '';
  categoryFromHome = '';
  constructor(
    private productservice: ProductService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((res: any) => {
      this.categoryFromHome = res.params.id;
    });
  }

  ngOnInit() {
    this.productservice.fetchCategories().subscribe((res: any) => {
      this.Categories = res;
      this.Categories.sort((a, b) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      );
      if (this.categoryFromHome) {
        this.Categories.forEach((category) => {
          if (category.key === this.categoryFromHome) {
            this.selectedCategoryId = category.id;
            this.selectedCategorykey = category.key;
          }
        });
      }
    });

    this.productservice.fetchProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  //categorySelection will trigger when category is selected from left navbar in  views > 468px view
  categorySelection(category) {
    this.selectedCategoryId === category.id
      ? (this.selectedCategoryId = '')
      : (this.selectedCategoryId = category.id);
    this.selectedCategorykey = category.key;
  }

  //selected will trigger when category is selected from category dropdown > 468px view
  selected() {
    this.Categories.forEach((category) => {
      if (category.key === this.selectedCategorykey) {
        this.selectedCategoryId = category.id;
        this.selectedCategorykey = category.key;
      }
    });
  }

  //addtoCart will trigger with item to be added in cart when Buy now is clicked.
  addtoCart(item) {
    this.productservice.addtoCart(item.id).subscribe((res: any) => {
      if (res.response === 'Success') {
        this.productservice.addedtocart(item);
      }
    });
  }
}
