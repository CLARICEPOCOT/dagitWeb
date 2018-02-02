import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { AddTrafficComponent } from '../add-traffic/add-traffic.component';
import { AddParkingComponent } from '../add-parking/add-parking.component';
import { SearchNotificationsComponent } from '../search-notifications/search-notifications.component';
import { FirebaseService } from '../../services/firebase.service';


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
  notifications: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
  ) {
    this.notifications = this.firebaseService.getNotification();
  }

  ngOnInit() {
    this.firebaseService.getNotification().subscribe(notification => {
      console.log(notification);
      this.notifications = notification;
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
