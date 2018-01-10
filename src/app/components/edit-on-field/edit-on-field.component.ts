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
  account: any;


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
      this.account = data;
  }

  ngOnInit() {
  }

  onEditOnfield(key, onFieldTMO) {
    this.onFieldTMO = {
      'fName': this.fName,
      'lName': this.lName,
      'username': this.username,
      'password': this.password,
      'location': this.location,
    };
    this.firebaseService.updateOnfieldTMO(key, this.onFieldTMO);
    console.log('Directory added');
    this.thisDialogRef2.close('Add');


  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }


}
