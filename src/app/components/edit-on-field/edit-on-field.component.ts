import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-on-field',
  templateUrl: './edit-on-field.component.html',
  styleUrls: ['./edit-on-field.component.css']
})
export class EditOnFieldComponent implements OnInit {

  onFieldTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: string;
  image?: string;
  accountOF: any;

  newFName: string;
  newLName: string;
  newUsername: string;
  newPassword: string;
  newLocation: string;


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
      this.accountOF = data;
      this.newFName = this.accountOF.fName;
      this.newLName = this.accountOF.lName;
      this.newUsername = this.accountOF.username;
      this.newPassword = this.accountOF.password;
      this.newLocation = this.accountOF.location;
  }

  ngOnInit() {
  }

  onEditOnfield(key, onFieldTMO) {

    // tslint:disable-next-line:triple-equals
    if (this.newFName != this.accountOF.fName) {
      this.fName = this.newFName;
    } else {
      this.fName = this.accountOF.fName;
    }

      // tslint:disable-next-line:triple-equals
      if (this.newLName != this.accountOF.lName) {
        this.lName = this.newLName;
      } else {
        this.lName = this.accountOF.lName;
      }

        // tslint:disable-next-line:triple-equals
    if (this.newPassword != this.accountOF.password) {
      this.password = this.newPassword;
    } else {
      this.password = this.accountOF.password;
    }

    // tslint:disable-next-line:triple-equals
    if (this.newUsername != this.accountOF.username) {
      this.username = this.newUsername;
    } else {
      this.username = this.accountOF.username;
    }

      // tslint:disable-next-line:triple-equals
      if (this.newLocation != this.accountOF.location) {
        this.location = this.newLocation;
      } else {
        this.location = this.accountOF.location;
      }

    this.onFieldTMO = {
      'fName': this.fName,
      'lName': this.lName,
      'username': this.username,
      'password': this.password,
      'location': this.location,
    };
    this.firebaseService.updateOnfieldTMO(key, this.onFieldTMO);
    console.log('Account updated');
    this.thisDialogRef2.close('Edit');


  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }


}
