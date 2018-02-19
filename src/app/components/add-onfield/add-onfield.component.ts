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
  userInfo: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: string;
  image: any;

  dbUser: any[] = [];
  duplicateUser: boolean;


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) {
    this.userInfo = this.firebaseService.getOnfieldTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.dbUser[i] = snapshot.val().username;
        i++;
      });
    });
   }

  ngOnInit() {
  }


  onCheck() {

    this.duplicateUser = true;

    for ( let j = 0; j < this.dbUser.length; j++ ) {
     // tslint:disable-next-line:triple-equals
     if (this.username != this.dbUser[j] ) {
      this.duplicateUser = false;
     } else {
       this.duplicateUser = true;
       break;
     }
    }


    if ( !this.duplicateUser) {
      this.onAdd(this.onFieldTMO);
    } else {
      console.log('duplicate username');
    }

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
          'location': this.location
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
