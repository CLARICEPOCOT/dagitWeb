import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
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

  openDialog() {
    const dialogRef = this.dialog.open(AddNotificationComponent, {
      width: '800px',
      data: 'ADD NEW NOTIFICATION'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.searchNotificationResult = result;
  });
  }

}
