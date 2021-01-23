import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewChecked {
  bannersData = [];
  Categories = [];
  slideIndex = 1;
  constructor(private productservice: ProductService) {}

  ngAfterViewChecked() {
    this.showSlides(this.slideIndex);
  }

  ngOnInit() {
    this.productservice.fetchBanners().subscribe((res: any) => {
      this.bannersData = res;
    });

    this.productservice.fetchCategories().subscribe((res: any) => {
      this.Categories = res;
      this.Categories.sort((a, b) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      );
    });
  }

  showSlides(slideIndex) {
    var i;
    var slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    var dots = document.getElementsByClassName('dot');
    if (slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    if (slideIndex < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

  changeSlide(number) {
    this.slideIndex = this.slideIndex + number;
    this.showSlides(this.slideIndex);
  }

  currentSlide(number) {
    this.slideIndex = number;
    this.showSlides(this.slideIndex);
  }


}
