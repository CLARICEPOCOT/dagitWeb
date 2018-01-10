import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-add-desk-tmo',
  templateUrl: './add-desk-tmo.component.html',
  styleUrls: ['./add-desk-tmo.component.css']
})

export class AddDeskTmoComponent implements OnInit {

  deskTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  emailAddress: string;
  image?: string;

  constructor(
    public thisDialogRef1: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  onAdd(deskTMO) {
    let complete = false;
    if (
      this.fName != null &&
      this.lName != null &&
      this.username != null &&
      this.password != null &&
      this.emailAddress != null ) {
        complete = true;

      } else {
        complete = false;
      }

      if (complete) {
        this.deskTMO = {
          'fName': this.fName,
          'lName': this.lName,
          'username': this.username,
          'password': this.password,
          'emailAddress': this.emailAddress,
        };

        if (this.image != null) {
          this.firebaseService.addDeskTMO(this.deskTMO);
          console.log('Desk TMO with image added');
          this.thisDialogRef1.close('ADD');
        } else {
          this.firebaseService.addDeskTMONoPhoto(this.deskTMO);
          console.log('Desk TMO added with no image added');
          this.thisDialogRef1.close('ADD');

        }


      } else {
        console.log('Please fill in all the required fields.');
      }

  }

  onCancel() {
    this.thisDialogRef1.close('Cancel');
  }

}
