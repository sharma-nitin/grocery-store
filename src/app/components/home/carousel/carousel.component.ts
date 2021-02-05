import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit,AfterViewChecked {
 @Input() bannersData;
  slideIndex = 1;
  timer;
  constructor() { }

  ngOnInit() {

    this.timer = setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }


    // To trigger carousel once view is checked
    ngAfterViewChecked() {
      this.showSlides(this.slideIndex);
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
