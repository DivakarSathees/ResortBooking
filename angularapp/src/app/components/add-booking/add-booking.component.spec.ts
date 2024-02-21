// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { AddBookingComponent } from './add-booking.component';
 
// describe('AddBookingComponent', () => {
//   let component: AddBookingComponent;
//   let fixture: ComponentFixture<AddBookingComponent>;
 
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AddBookingComponent],
//       providers: [
//         FormBuilder,
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: Router, useValue: {} },
//       ],
//       imports: [ReactiveFormsModule],
//     }).compileComponents();
 
//     fixture = TestBed.createComponent(AddBookingComponent);
//     component = fixture.componentInstance;
//   });
 
//   fit('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
 
//   fit('should define getAllBookings function', () => {
//     expect(component.getAllBookings).toBeDefined();
//   });
 
//   it('should call getAllBookings on ngOnInit', () => {
//     spyOn(component, 'getAllBookings');
//     component.ngOnInit();
//     expect(component.getAllBookings).toHaveBeenCalled();
//   });
// });