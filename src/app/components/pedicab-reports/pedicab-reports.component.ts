import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PedicabReportContentComponent } from '../pedicab-report-content/pedicab-report-content.component';
import { SearchPedicabComponent } from '../search-pedicab/search-pedicab.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pedicab-reports',
  templateUrl: './pedicab-reports.component.html',
  styleUrls: ['./pedicab-reports.component.css']
})
export class PedicabReportsComponent implements OnInit {

  contentDialog = '';
  searchDialog = '';
  reports: any;
  report: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {
    this.reports = firebaseService.getPedicabReports();
  }

  ngOnInit() {
    this.firebaseService.getPedicabReports().subscribe(report => {
      console.log(report);
      this.report = report;
    });
  }

  openSearch() {
    const dialogRef = this.dialog.open(SearchPedicabComponent, {
      width: '900px',
      data: 'SEARCH PEDICAB'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.searchDialog = result;
    });
  }


  open(content) {
    this.firebaseService.readPedicab(content);
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
