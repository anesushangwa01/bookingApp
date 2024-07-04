import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingViewDetailsComponent } from './booking-view-details.component';

describe('BookingViewDetailsComponent', () => {
  let component: BookingViewDetailsComponent;
  let fixture: ComponentFixture<BookingViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingViewDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
