import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddOnfieldComponent } from '../add-onfield/add-onfield.component';
import { AddDeskTmoComponent } from '../add-desk-tmo/add-desk-tmo.component';
import { EditDeskComponent } from '../edit-desk/edit-desk.component';
import { EditOnFieldComponent } from '../edit-on-field/edit-on-field.component';
import { SearchAccountsComponent } from '../search-accounts/search-accounts.component';
import { SearchEmailComponent } from '../search-email/search-email.component';
import { SearchLocationComponent } from '../search-location/search-location.component';
import { SearchUsernameComponent } from '../search-username/search-username.component';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../uploads/shared/upload.service';
import { Upload } from '../../uploads/shared/upload';

import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageAccountsComponent implements OnInit {


  selectedFiles: FileList | null;
  currentUpload: Upload;

  dialogOneResult = '';
  dialogTwoResult = '';
  dialogSearchResult = '';
  dialogEditOnfield = '';
  dialogEditDesk = '';
  dialogSearchLocation = '';
  dialogSearchEmail = '';
  dialogSearchUsername = '';

  accountOF: any;
  accountD: any;
  onFieldTMO: any;
  deskTMO: any;
  imageURL: any;
  deskID: any;
  onFieldID: any;
  users: any = [];
  currUser: any;
  currUserUid: any;

  image: any;
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private upSvc: UploadService,
    public angularFireAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp,
    public router: Router
  ) {

      this.onFieldTMO = this.firebaseService.getOnfieldTMO();
      this.deskTMO = this.firebaseService.getDeskTMO();
      this.currentUser = angularFireAuth.auth.currentUser;
      if (this.currentUser == null)
      {
        this.router.navigate(['/']);
      }

      this.deskTMO.subscribe(snapshot => {
        var i = 0;
        snapshot.forEach(snap => {
          this.users[i] = snap;
          i++;
        })
      });
  }

  ngOnInit() {
    

    this.firebaseService.getOnfieldTMO().subscribe(accountOF => {
      this.accountOF = accountOF;

      console.log(accountOF);
    });

    this.firebaseService.getDeskTMO().subscribe(accountD => {
      this.accountD = accountD;
      console.log(accountD);
    });

    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].emailAddress == this.currentUser.email){
        this.currUser = this.users[i];
        this.currUserUid = this.users[i].uid;
        break;
      }
    }
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

  openSearchLocation() {
    const dialogRef = this.dialog.open(SearchLocationComponent, {
      width: '800px',
      data: 'SEARCH LOCATIONS'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.dialogSearchLocation = result;
    });
  }

  openSearchEmail() {
    const dialogRef = this.dialog.open(SearchEmailComponent, {
      width: '800px',
      data: 'SEARCH EMAILS'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.dialogSearchEmail = result;
    });
  }


  openSearchUsername() {
    const dialogRef = this.dialog.open(SearchUsernameComponent, {
      width: '800px',
      data: 'SEARCH USERNAMES'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.dialogSearchUsername = result;
    });
  }

  onEditDesk(accountD) {
    const dialogRef = this.dialog.open(EditDeskComponent, {
      width: '800px',
      data: accountD

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogEditDesk = result;
  });
  }

  onEditOnfield(accountOF) {
    const dialogRef = this.dialog.open(EditOnFieldComponent, {
      width: '800px',
      data: accountOF

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
    this.firebaseService.deleteDeskTMO(key.$key);
  }

  // uploading images

  selectFile(event){
    const file = event.target.files.item(0);

    if(file.type.match('image.*')){
      this.selectedFiles = event.target.files;
    }
  }

  uploadMyAccount(deskTMO) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.firebaseService.addDeskImage(deskTMO, file);
  }

  uploadDesk(deskTMO) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.firebaseService.addDeskImage(deskTMO, file);
  }

  getPhoto(){
    this.currUser =  this.firebaseService.uploadGetDeskPhoto(this.currUser);
    return this.currUser.path;
  }


  uploadOF(onFieldTMO) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.firebaseService.addOnFieldImage(onFieldTMO, file);
  }

  // updating enabled

  disableOF(val, key) {
    this.firebaseService.editEnabledOF(val, key);
  }

  enableOF(val, key) {
    this.firebaseService.editEnabledOF(val, key);
  }

  enableD(val, key) {
    this.firebaseService.editEnabledD(val, key);
  }

  disableD(val, key) {
    this.firebaseService.editEnabledD(val, key);
  }

  // getting images

  getDeskPhoto(accountD) {
    const path = accountD.path.toString();
    console.log(path);
    const storageRef = firebase.storage().ref();
    const spaceRef = storageRef.child(path).getDownloadURL().then((url) => {
    // Set image url
    this.imageURL = url;
    }).catch((error) => {
      console.log(error);
    });
  }

  getUserPhoto(current){
    const path = current.path.toString();
    console.log(path);
    const storageRef = firebase.storage().ref();
    const spaceRef = storageRef.child(path).getDownloadURL().then((url) => {
    // Set image url
    this.imageURL = url;
    }).catch((error) => {
      console.log(error);
    });
  }


  getOnFieldPhoto(accountOF) {
    const storageRef = firebase.storage().ref();
    const spaceRef = storageRef.child(accountOF.path).getDownloadURL().then((url) => {
    // Set image url
    this.imageURL = url;
    }).catch((error) => {
      console.log(error);
    });
  }
}

