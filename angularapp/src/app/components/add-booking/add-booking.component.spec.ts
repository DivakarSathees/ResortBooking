import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';  // Import ReactiveFormsModule and FormBuilder
import { ActivatedRoute } from '@angular/router';
import { AddBookingComponent } from './add-booking.component';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  // Mock ActivatedRoute
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '1', // Adjust this value based on your test scenario
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookingComponent],
      imports: [ReactiveFormsModule],  // Import ReactiveFormsModule here
      providers: [
        FormBuilder,  // Provide FormBuilder here
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_define_makePayment_method', () => {
    expect(component['makePayment']).toBeTruthy();
  });
});
