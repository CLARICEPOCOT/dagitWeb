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
  selector: 'app-edit-desk',
  templateUrl: './edit-desk.component.html',
  styleUrls: ['./edit-desk.component.css']
})
export class EditDeskComponent implements OnInit {

  deskTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  emailAddress: string;
  image?: string;
  account: any;


  newFName: string;
  newLName: string;
  newUsername: string;
  newPassword: string;
  newEmailAddress: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
      this.account = data;
      this.newFName = this.account.fName;
      this.newLName = this.account.lName;
      this.username = this.account.username;
      this.emailAddress = this.account.emailAddress;
      this.newPassword = this.account.password;
  }

  ngOnInit() {
  }


  onEdit(key, deskTMO) {

    // tslint:disable-next-line:triple-equals
    if (this.newFName != this.account.fName) {
      this.fName = this.newFName;
    } else {
      this.fName = this.account.fName;
    }

    // tslint:disable-next-line:triple-equals
    if (this.newLName != this.account.lName) {
      this.lName = this.newLName;
    } else {
      this.lName = this.account.lName;
    }

      // tslint:disable-next-line:triple-equals
      if (this.newPassword != this.account.password) {
        this.password = this.newPassword;
      } else {
        this.password = this.account.password;
      }


    this.deskTMO = {
      'fName': this.fName,
      'lName': this.lName,
      'username': this.username,
      'password': this.password,
      'email': this.emailAddress,
    };
    this.firebaseService.updateDeskTMO(key, this.deskTMO);
    console.log('Desk TMO edited');
    this.thisDialogRef2.close('Edit');


  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }
}
