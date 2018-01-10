import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {

  notification: any;
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
        {name: 'Traffic', value: 'Traffic'},
        {name: 'Parking', value: 'Parking'},
        {name: 'Announcement', value: 'Announcement'},
      ];

  constructor(
    public thisDialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }


  onAdd(notification) {
    this.notification = {
      'category': this.category,
      'timeStamp': this.timeStamp,
      'notifDetail': this.notifDetail,
    };

    this.firebaseService.addNotification(this.notification);
    console.log('Notification added');
    this.thisDialogRef.close('Add');
  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
