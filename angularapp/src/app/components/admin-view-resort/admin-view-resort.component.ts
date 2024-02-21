import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resort } from 'src/app/models/resort.model';
import { BookingService } from 'src/app/services/booking.service';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-admin-view-resort',
  templateUrl: './admin-view-resort.component.html',
  styleUrls: ['./admin-view-resort.component.css']
})
export class AdminViewResortComponent implements OnInit {
  showDeletePopup = false;
  selectedResort: Resort ;
  selectedItem: any = {};
  isEditing = false;
  resorts: any[] = [];
  photoImage = '';
  addResortForm: FormGroup; 
  constructor(private fb: FormBuilder, private bookingService: BookingService, private resortService: ResortService) {
    this.addResortForm = this.fb.group({
      resortImageUrl: ['', Validators.required], // Add other form controls as needed
      // ... other form controls
    });
   }

  ngOnInit(): void {
    this.getAllResorts();
  }

  getAllResorts() {
    this.resortService.getAllResorts().subscribe(
      (data: any) => {
        this.resorts = data;
        console.log(this.resorts)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((response: any) => {
      // this.resorts = response;
      console.log(response,'response');
    });
  }

  deleteResort(resortDetails: any) {
    // this.getAllBookings();
    this.bookingService.getAllBookings().subscribe((response: any) => {
      // this.resorts = response;
      console.log(response,'response');

      
      response.map((item)=>{
        if(item.resortId==resortDetails.resortId)
        {
          alert("Resort cannot be deleted");
        }else{
          this.resortService.deleteResort(resortDetails.resortId).subscribe(
      (data: any) => {
        console.log('Resort deleted successfully', data);
        this.getAllResorts();
      },
      (err) => {
        console.log(err);
      }
    );
        }
      })
    });


// console.log(this.getAllBookings)
    // this.resortService.deleteResort(resortDetails.resortId).subscribe(
    //   (data: any) => {
    //     console.log('Resort deleted successfully', data);
    //     this.getAllResorts();
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  editResort(resort: Resort) {
    console.log('Edit Resort - Selected Resort Before:', this.selectedResort);
    console.log('Edit Resort - Resort to Edit:', resort);
    
    // Set the selected resort and enter edit mode
    this.selectedResort = resort ; // Create a copy to avoid direct modification
    this.isEditing = true;

    console.log('Edit Resort - Selected Resort After:', this.selectedResort);
}

  updateResort(resortDetails: Resort) {
    if (this.photoImage) {
      // If a new image is selected, update the resort's image URL
      resortDetails.resortImageUrl = this.photoImage;
    }
    //save
    // Implement your update logic here, using the resortService.put() method
    this.resortService.updateResort(resortDetails).subscribe(
      (data: any) => {
        console.log('Resort updated successfully', data);
        this.getAllResorts();
        this.cancelEdit(); // Exit edit mode after successful update
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedResort = null;
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.photoImage=base64String
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          // Handle error appropriately
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
