import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddOnfieldComponent } from '../add-onfield/add-onfield.component';
import { AddDeskTmoComponent } from '../add-desk-tmo/add-desk-tmo.component';
import { EditDeskComponent } from '../edit-desk/edit-desk.component';
import { EditOnFieldComponent } from '../edit-on-field/edit-on-field.component';
import { SearchAccountsComponent } from '../search-accounts/search-accounts.component';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageAccountsComponent implements OnInit {
  dialogOneResult = '';
  dialogTwoResult = '';
  dialogSearchResult = '';
  dialogEditOnfield = '';
  dialogEditDesk = '';
  onFieldTMO: any;
  deskTMO: any;
  imageURL: any;
  deskID: any;
  onFieldID: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
  ) {
    this.onFieldTMO = this.firebaseService.getOnfieldTMO();
    this.deskTMO = this.firebaseService.getDeskTMO();
  }

  ngOnInit() {


    this.firebaseService.getOnfieldTMO().subscribe(onFieldTMO => {
      
      this.onFieldTMO = onFieldTMO;
    
      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(this.onFieldTMO.path);
      storageRef.child(this.onFieldTMO.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageURL = url;
      }).catch((error) => {
        console.log(error);
      });
    });

    this.firebaseService.getDeskTMO().subscribe(deskTMO => {

      this.deskTMO = deskTMO;

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(this.deskTMO.path);
      storageRef.child(this.deskTMO.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageURL = url;
      }).catch((error) => {
        console.log(error);
      });

    }); 
  }

  openDialog1() {
    const dialogRef1 = this.dialog.open(AddDeskTmoComponent, {
      width: '800px',
      data: 'ADD NEW DESK TMO'

    });

  dialogRef1.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogOneResult = result;
  });
  }

  openDialog2() {
    const dialogRef2 = this.dialog.open(AddOnfieldComponent, {
      width: '800px',
      data: 'ADD NEW ON-FIELD TMO'

    });

  dialogRef2.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogTwoResult = result;
  });
  }

  openSearch() {
    const dialogRef = this.dialog.open(SearchAccountsComponent, {
      width: '800px',
      data: 'ADD NEW ON-FIELD TMO'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogSearchResult = result;
  });
  }

  onEditDesk(account) {
    const dialogRef = this.dialog.open(EditDeskComponent, {
      width: '800px',
      data: account

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogEditDesk = result;
  });
  }

  onEditOnfield(account) {
    const dialogRef = this.dialog.open(EditOnFieldComponent, {
      width: '800px',
      data: account

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogEditOnfield = result;
  });
  }

  onDeleteOnfield(key) {
    this.firebaseService.deleteOnfieldTMO(key);
  }

  onDeleteDesk(key) {
    this.firebaseService.deleteDeskTMO(key);
  }

  }

