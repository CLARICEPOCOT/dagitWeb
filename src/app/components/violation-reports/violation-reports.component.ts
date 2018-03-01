import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViolationContentComponent } from '../violation-content/violation-content.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-violation-reports',
  templateUrl: './violation-reports.component.html',
  styleUrls: ['./violation-reports.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViolationReportsComponent implements OnInit {

  contentDialog = '';
  violations: any;
  violation: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {
    this.violations = firebaseService.getViolations();
  }

  ngOnInit() {
    this.firebaseService.getViolations().subscribe(violation => {
      console.log(violation);
      this.violation = violation;
    });
  }

  open(content) {
    this.firebaseService.readViolations(content);
    const dialogRef = this.dialog.open(ViolationContentComponent, {
      width: '800px',
      data: content

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.contentDialog = result;
  });
  }

}
