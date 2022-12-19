import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTicketAdminComponent } from './confirm-ticket-admin.component';

describe('ConfirmTicketAdminComponent', () => {
  let component: ConfirmTicketAdminComponent;
  let fixture: ComponentFixture<ConfirmTicketAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTicketAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTicketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
