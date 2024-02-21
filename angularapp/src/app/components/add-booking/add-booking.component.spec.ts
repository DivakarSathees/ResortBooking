import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AddBookingComponent } from './add-booking.component';
import { BookingService } from 'src/app/services/booking.service';
import { ResortService } from 'src/app/services/resort.service';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;
  let resortServiceSpy: jasmine.SpyObj<ResortService>;

  beforeEach(() => {
    const bookingSpy = jasmine.createSpyObj('BookingService', ['getAllBookings', 'addBooking']);
    const resortSpy = jasmine.createSpyObj('ResortService', ['getResortById']);

    TestBed.configureTestingModule({
      declarations: [AddBookingComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: BookingService, useValue: bookingSpy },
        { provide: ResortService, useValue: resortSpy }
      ],
    });

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    bookingServiceSpy = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    resortServiceSpy = TestBed.inject(ResortService) as jasmine.SpyObj<ResortService>;
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should set showSuccessPopup to true on successful payment', () => {
    expect(component.['makePayment']).toBeDefined();
  });

});
