import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddInformationComponent} from '../add-information/add-information.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  dialogResult = '';
  information: any;
  allInformation: any;
  id: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {
    this.allInformation = this.firebaseService.getInformation();
   }

  ngOnInit() {
    this.firebaseService.getInformation().subscribe(information => {
      console.log(information);
      this.information = information;
    });

  }

  openAdd() {
    const dialogRef = this.dialog.open(AddInformationComponent, {
      width: '800px',
      data: 'ADD NEW INFORMATION'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogResult = result;
  });
  }


}
