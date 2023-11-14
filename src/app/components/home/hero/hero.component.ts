import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  imagenes: string[] = ['/assets/img/home/hero.jpg', '/assets/img/home/hero1.jpg', '/assets/img/home/hero2.jpg', '/assets/img/home/hero3.jpg', '/assets/img/home/hero4.jpg',
    '/assets/img/home/hero5.jpg', '/assets/img/home/hero6.jpg', '/assets/img/home/hero7.jpg', '/assets/img/home/hero8.jpg', '/assets/img/home/hero9.jpg'];
  dots: number[] = [];
  currentSlide = 0;

  ngOnInit(): void {
    this.dots = Array(this.imagenes.length).fill(0).map((_, i) => i);
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  showSlide(index: number) {
    this.currentSlide = index;
    this.updateIndicator();
    //this.imagenes.forEach((_, i) => i === index ? this.show(i) : this.hide(i));
  }

  show(index: number) {
    const slide = document.querySelectorAll('.slide')[index] as HTMLElement;
    slide.style.display = 'block';
  }

  hide(index: number) {
    const slide = document.querySelectorAll('.slide')[index] as HTMLElement;
    slide.style.display = 'none';
  }

  updateIndicator() {
    this.dots.forEach((_, i) => i === this.currentSlide ? this.show(i) : this.hide(i));
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.showSlide(index);
    this.updateIndicator();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.imagenes.length;
    //this.showSlide(this.currentSlide);
    this.updateIndicator();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.imagenes.length) % this.imagenes.length;
    //this.showSlide(this.currentSlide);
    this.updateIndicator();
  }

}
