import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-desk-tmo',
  templateUrl: './add-desk-tmo.component.html',
  styleUrls: ['./add-desk-tmo.component.css']
})

export class AddDeskTmoComponent implements OnInit {

  deskTMO: any;
  userInfo: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  emailAddress: string;
  image?: string;

  dbEmail: any[] = [];
  dbUser: any[] = [];
  duplicateEmail: boolean;
  duplicateUser: boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public thisDialogRef1: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) {
    this.userInfo = this.firebaseService.getDeskTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.dbUser[i] = snapshot.val().username;
        this.dbEmail[i] = snapshot.val().emailAddress;
        i++;
      });
    });
   }

  ngOnInit() {
  }

  onCheck() {
    this.duplicateEmail = true;
    this.duplicateUser = true;

    for ( let i = 0; i < this.dbEmail.length; i++ ) {
      // tslint:disable-next-line:triple-equals
      if (this.emailAddress != this.dbEmail[i] ) {
        this.duplicateEmail = false;
      } else {
        this.duplicateEmail = true;
        break;
      }

    }

    for ( let j = 0; j < this.dbUser.length; j++ ) {
     // tslint:disable-next-line:triple-equals
     if (this.username != this.dbUser[j] ) {
      this.duplicateUser = false;
     } else {
       this.duplicateUser = true;
       break;
     }
    }

    if (!this.duplicateEmail) {
      if (!this.duplicateUser) {
        this.onAdd(this.deskTMO);
      } else {
        console.log('duplicate user');
      }
    } else {
      console.log('duplicate email');
    }
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
          'access': 'enabled'
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
