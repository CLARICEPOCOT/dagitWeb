import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccidentContentComponent } from '../accident-content/accident-content.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { SearchAccidentsComponent } from '../search-accidents/search-accidents.component';

@Component({
  selector: 'app-accident-reports',
  templateUrl: './accident-reports.component.html',
  styleUrls: ['./accident-reports.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccidentReportsComponent implements OnInit {

  contentDialog = '';
  searchDialog = '';
  accidents: any;
  accident: any;
  accidentLogs: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {
    this.accidents = firebaseService.getAccidents();
  }

  ngOnInit() {
    this.firebaseService.getAccidents().subscribe(accident => {
      console.log(accident);
      this.accident = accident;
    });
  }

  openSearch() {
    const dialogRef = this.dialog.open(SearchAccidentsComponent, {
      width: '900px',
      data: 'SEARCH ACCIDENTS'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.searchDialog = result;
    });
  }

  open(content) {
    this.firebaseService.readAccidents(content);
    const dialogRef = this.dialog.open(AccidentContentComponent, {
      width: '800px',
      data: content

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.contentDialog = result;
  });
  }

}
