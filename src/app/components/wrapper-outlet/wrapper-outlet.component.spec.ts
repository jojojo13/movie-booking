import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperOutletComponent } from './wrapper-outlet.component';

describe('WrapperOutletComponent', () => {
  let component: WrapperOutletComponent;
  let fixture: ComponentFixture<WrapperOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
