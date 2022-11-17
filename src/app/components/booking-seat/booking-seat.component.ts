import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.css'],
})
export class BookingSeatComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  total = 0;
  ngOnInit(): void {}
  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (!event.target.classList.contains('unavailable')) {
      if (hasClass) {
        this.total -= 50;
        this.renderer.removeClass(event.target, className);
      } else {
        this.total += 50;
        this.renderer.addClass(event.target, className);
      }
    }
  }
}
