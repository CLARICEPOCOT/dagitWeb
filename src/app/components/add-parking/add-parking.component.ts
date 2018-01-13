import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent implements OnInit {

  notification: any;
  rating: string;
  location: string;
  category: string;
  notifDetail: string;
  today = new Date();

  date = (this.today.getMonth() + 1) + '/' + this.today.getDate() + '/' + this.today.getFullYear();
  hours = this.today.getHours() <= 12 ? this.today.getHours() : this.today.getHours() - 12;
  am_pm = this.today.getHours() >= 12 ? 'PM' : 'AM';
  hoursFormatted = this.hours < 10 ? '0' + this.hours : this.hours;
  minutes = this.today.getMinutes() < 10 ? '0' + this.today.getMinutes() : this.today.getMinutes();

  time = this.hoursFormatted + ':' + this.minutes + ' ' + this.am_pm;
  timeStamp = this.date + ' ' + this.time;

  categoryControl = new FormControl('', [Validators.required]);

      categories = [
        {name: 'Available', value: 'Available Parking'},
        {name: 'Not Available', value: 'No Available Parking'},
      ];

  constructor(
    public thisDialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }


  rateParking(notification) {
    let complete = false;
    if (this.rating != null && this.location != null) {
      complete = true;
    } else {
      console.log('Please fill in all the required fields.');
    }

    if (complete) {
      this.notification = {
        'category': 'Parking',
        'timeStamp': this.timeStamp,
        'notifDetail': this.rating + ': ' + this.location,
      };

      this.firebaseService.addNotification(this.notification);
      console.log('Notification added');
      this.thisDialogRef.close('Add');
    }

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
