import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccidentReportsComponent } from '../accident-reports/accident-reports.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-accident-content',
  templateUrl: './accident-content.component.html',
  styleUrls: ['./accident-content.component.css']
})
export class AccidentContentComponent implements OnInit {

  accident: any;

  constructor(
    public thisDialogRef: MatDialogRef<AccidentReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService
  ) { this.accident = data; }

  ngOnInit() {
  }

  onClose() {
    this.thisDialogRef.close('Close');

  }

}
