import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListMovieComponent } from './booking-list-movie.component';

describe('BookingListMovieComponent', () => {
  let component: BookingListMovieComponent;
  let fixture: ComponentFixture<BookingListMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingListMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
