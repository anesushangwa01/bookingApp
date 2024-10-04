import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeResetComponent } from './code-reset.component';

describe('CodeResetComponent', () => {
  let component: CodeResetComponent;
  let fixture: ComponentFixture<CodeResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
