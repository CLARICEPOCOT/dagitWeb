import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { AddTrafficComponent } from '../add-traffic/add-traffic.component';
import { AddParkingComponent } from '../add-parking/add-parking.component';
import { SearchNotificationsComponent } from '../search-notifications/search-notifications.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  notificationResult = '';
  searchNotificationResult = '';
  parkingResult = '';
  trafficResult = '';
  notification: any;
  notifications: any;
  current: any;

  date = moment().format('MMMM D YYYY');


  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    public router: Router,
    public angularFireAuth: AngularFireAuth
  ) {
    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
    this.notifications = this.firebaseService.getNotifLog(this.date);
  }

  ngOnInit() {

    this.firebaseService.getNotifLog(this.date).subscribe(notification => {
      // console.log(notification);
      this.notification = notification;
    });
  }

  openSearch() {
    const dialogRef = this.dialog.open(SearchNotificationsComponent,{
      width: '800px',
      data: 'SEARCH NOTIFICATION'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.notificationResult = result;
    });
  }

  addAnnouncement() {
    const dialogRef = this.dialog.open(AddNotificationComponent, {
      width: '800px',
      data: 'ADD NEW ANNOUNCEMENT'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.searchNotificationResult = result;
  });
  }

  addParking() {
    const dialogRef = this.dialog.open(AddParkingComponent, {
      width: '800px',
      data: 'ADD NEW ANNOUNCEMENT'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.parkingResult = result;
  });
  }

  addTraffic() {
    const dialogRef = this.dialog.open(AddTrafficComponent, {
      width: '800px',
      data: 'ADD NEW ANNOUNCEMENT'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.trafficResult = result;
  });
  }

}
