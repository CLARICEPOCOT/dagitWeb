import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-onfield',
  templateUrl: './add-onfield.component.html',
  styleUrls: ['./add-onfield.component.css']
})
export class AddOnfieldComponent implements OnInit {

  onFieldTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: string;
  image: any;


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  onAdd(onFieldTMO) {
    let complete = false;
    if (
      this.fName != null &&
      this.lName != null &&
      this.username != null &&
      this.password != null &&
      this.location != null ) {
        complete = true;

      } else {
        complete = false;
      }

      if (complete) {
        this.onFieldTMO = {
          'fName': this.fName,
          'lName': this.lName,
          'username': this.username,
          'password': this.password,
          'emailAddress': this.location,
        };

        if (this.image != null) {
          this.firebaseService.addOnfieldTMO(this.onFieldTMO);
          console.log('Onfield TMO with image added');
          this.thisDialogRef2.close('ADD');
        } else {
          this.firebaseService.addOnFieldTMONoPhoto(this.onFieldTMO);
          console.log('Onfield TMO added with no image added');
          this.thisDialogRef2.close('ADD');

        }


      } else {
        console.log('Please fill in all the required fields.');
      }

  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }

}
