import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PedicabReportsComponent } from '../pedicab-reports/pedicab-reports.component';
import { PedicabReportContentComponent } from '../pedicab-report-content/pedicab-report-content.component';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-search-pedicab',
  templateUrl: './search-pedicab.component.html',
  styleUrls: ['./search-pedicab.component.css']
})
export class SearchPedicabComponent implements OnInit {
    contentDialog = '';

    month: string;
    day: any;
    year: any;
    date: any;
    found: boolean;
    notFound: boolean;
    reports: any;
    report: any;

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

  constructor(public dialog: MatDialog,
    public thisDialogRef: MatDialogRef<PedicabReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  onSearch() {
    const monthLength = this.month.trim().length;
    const dayLength = this.day.trim().length;
    const yearLength = this.year.trim().length;


    if ( (monthLength !== 0)
       && (dayLength !== 0)
       && (yearLength !== 0)) {
        // setting the date to query
        this.date = this.month + ' ' + this.day + ' ' + this.year;
        console.log(this.date);
        this.found = false;
        this.notFound = false;

        this.reports = this.firebaseService.getPedicabLog(this.date);
        if ( this.reports == null ) {
          this.notFound = true;
        }
        this.firebaseService.getPedicabLog(this.date).subscribe(notification => {
          // console.log(notification);
          this.report = notification;
          if (this.report != null) {
            this.found = true;
          }
        });

      }

  }


  onCancel() {
    this.thisDialogRef.close('CLOSE');

  }

  open(content) {
    this.firebaseService.readPedicabLogs(content);
    const dialogRef = this.dialog.open(PedicabReportContentComponent, {
      width: '800px',
      data: content

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.contentDialog = result;
  });
  }

}
