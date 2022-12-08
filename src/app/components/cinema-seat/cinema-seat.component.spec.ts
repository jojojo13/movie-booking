import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaSeatComponent } from './cinema-seat.component';

describe('CinemaSeatComponent', () => {
  let component: CinemaSeatComponent;
  let fixture: ComponentFixture<CinemaSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
