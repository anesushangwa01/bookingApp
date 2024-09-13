import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxibookingComponent } from './taxibooking.component';

describe('TaxibookingComponent', () => {
  let component: TaxibookingComponent;
  let fixture: ComponentFixture<TaxibookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxibookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxibookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
