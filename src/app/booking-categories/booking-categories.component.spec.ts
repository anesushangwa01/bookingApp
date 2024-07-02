import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCategoriesComponent } from './booking-categories.component';

describe('BookingCategoriesComponent', () => {
  let component: BookingCategoriesComponent;
  let fixture: ComponentFixture<BookingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
