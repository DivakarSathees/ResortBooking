import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { AddBookingComponent } from './add-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookingComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define onSubmit function', () => {
    expect(component.onSubmit).toBeDefined();
  });

  it('should call onSubmit when form is submitted', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    
    // Fill in form values (modify as needed)
    component.addBookingForm.controls['address'].setValue('Test Address');
    component.addBookingForm.controls['noOfPersons'].setValue(3);
    // ... (fill in other form fields as needed)

    // Trigger form submission
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('submit', null);

    // Simulate asynchronous form submission
    tick();
    fixture.detectChanges();

    // Check if onSubmit was called
    expect(component.onSubmit).toHaveBeenCalled();
  }));
});
