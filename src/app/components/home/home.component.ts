import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewChecked, OnDestroy {
  bannersData = [];
  Categories = [];
  slideIndex = 1;
  timer;
  constructor(private productservice: ProductService) {}

  // To trigger carousel once view is checked
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

    this.timer = setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }

  //showSlides method to display currently selected slide at passed index.
  showSlides(slideIndex) {
    var i;
    var slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
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

  //changeSlide method to display slide at passed index.
  changeSlide(number) {
    this.slideIndex = this.slideIndex + number;
    this.showSlides(this.slideIndex);
  }

  //slideatDot method to display slide at clicked dot .
  slideatDot(number) {
    this.slideIndex = number;
    this.showSlides(this.slideIndex);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
