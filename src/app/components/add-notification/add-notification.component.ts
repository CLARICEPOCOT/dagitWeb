import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {

  notification: any;
  title: string;
  description: string;
  notifDetail: string;
  today = new Date();

  currentUser: any;
  dbFName: any[] = [];
  dbLName: any[] = [];
  fName: string;
  lName: string;

  timeStamp = moment().format('MMMM Do YYYY, h:mm A');

  constructor(
    public thisDialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public angularFireAuth: AngularFireAuth
  ) {
    this.currentUser = this.angularFireAuth.auth.currentUser.displayName;

  }

  ngOnInit() {
  }


  onAdd(notification) {
    let complete = false;
    if (this.title != null && this.description != null) {
      complete = true;
    } else {
      console.log('Please fill in all the required fields.');
    }

    if (complete) {
      this.getUser();
      this.notification = {
        'category': 'Announcement',
        'timeStamp': this.timeStamp,
        'title': this.title,
        'notifDetail': this.description,
        'fName': this.currentUser,
        'lName': '',
        'sort': 0 - Date.now()
      };

      const date = moment().format('MMMM D YYYY');

      this.firebaseService.addNotification(this.notification);
      this.firebaseService.addNotifLog(date, this.notification);
      console.log('Notification added');
      this.thisDialogRef.close('Add');
    }

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

  getUser() {
    for ( let i = 0; i < this.dbFName.length; i++) {
       this.fName = this.dbFName[i];
    }

    for ( let j = 0; j < this.dbLName.length; j++) {
       this.lName = this.dbLName[j];
    }
  }

}
