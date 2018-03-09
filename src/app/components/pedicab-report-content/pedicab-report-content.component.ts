import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PedicabReportsComponent } from '../pedicab-reports/pedicab-reports.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pedicab-report-content',
  templateUrl: './pedicab-report-content.component.html',
  styleUrls: ['./pedicab-report-content.component.css']
})
export class PedicabReportContentComponent implements OnInit {

  violation: any;

  constructor(
    public thisDialogRef: MatDialogRef<PedicabReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService
  ) {
    this.violation = data;
  }

  ngOnInit() {
  }

  onClose() {
    this.thisDialogRef.close('Close');

  }


}
