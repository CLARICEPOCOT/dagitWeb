import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-search-notifications',
  templateUrl: './search-notifications.component.html',
  styleUrls: ['./search-notifications.component.css']
})
export class SearchNotificationsComponent implements OnInit {
  directory: any;
  month: string;
  day: any;
  year: any;
  date: any;

  notifications: any;
  notification: any;


  monthControl = new FormControl('', [Validators.required]);

    months = [
      {name: 'January', value: 'January'},
      {name: 'February', value: 'February'},
      {name: 'March', value: 'March'},
      {name: 'April', value: 'April'},
      {name: 'May', value: 'May'},
      {name: 'June', value: 'June'},
      {name: 'July', value: 'July'},
      {name: 'August', value: 'August'},
      {name: 'September', value: 'September'},
      {name: 'October', value: 'October'},
      {name: 'November', value: 'November'},
      {name: 'December', value: 'December'},
    ];


  constructor(
    public thisDialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    ) {


     }

    ngOnInit() {

    }


    onSearch(directory) {
      const monthLength = this.month.trim().length;
      const dayLength = this.day.trim().length;
      const yearLength = this.year.trim().length;

      if ( (monthLength !== 0)
         && (dayLength !== 0)
         && (yearLength !== 0)) {
          this.date = this.month + '' + this.data + '' + this.day;
          this.notifications = this.firebaseService.getNotifLog(this.date);
          // console.log(this.notifications);
          this.firebaseService.getNotifLog(this.date).subscribe(notification => {
            console.log(notification);
            this.notification = notification;
          });

          // this.thisDialogRef.close('Add');
        }

    }


    onCancel() {
      this.thisDialogRef.close('CLOSE');

    }

}
