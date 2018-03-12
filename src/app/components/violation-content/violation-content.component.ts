import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViolationReportsComponent } from '../violation-reports/violation-reports.component';
import { SearchViolationComponent } from '../search-violation/search-violation.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-violation-content',
  templateUrl: './violation-content.component.html',
  styleUrls: ['./violation-content.component.css']
})
export class ViolationContentComponent implements OnInit {

  violation: any;
  imageURL: any = null;

  constructor(
    public thisDialogRef: MatDialogRef<ViolationReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService
  ) {
    this.violation = data;
    this.imageURL = this.violation.image;
   }

  ngOnInit() {
  }

  onClose() {
    this.thisDialogRef.close('Close');

  }

}
