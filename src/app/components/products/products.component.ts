import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  Categories = [];
  products=[];
  selectedoption='';
  constructor(private productservice:ProductService) { }

  ngOnInit() {
    this.productservice.fetchCategories().subscribe((res: any) => {
      this.Categories = res;
      this.Categories.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
      this.selectedoption = this.Categories[0].name;
    });

    this.productservice.fetchProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

}
