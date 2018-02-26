import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';


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


  /*
  deskTMO: any;
  userInfo: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  emailAddress: string;


  dbEmail: any[] = [];
  dbUser: any[] = [];
  duplicateEmail: boolean;
  duplicateUser: boolean;*/

  deskTMO: any;
  fName: string;
  lName: string;
  name: string;
  email: string;
  password: string;

  duplicateEmail: boolean;
  invalidEmail: boolean;
  weakPassword: boolean;

  image?: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public thisDialogRef1: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    /*
    this.userInfo = this.firebaseService.getDeskTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.dbUser[i] = snapshot.val().username;
        this.dbEmail[i] = snapshot.val().emailAddress;
        i++;
      });
    }); */
   }

  ngOnInit() {
  }

  sendemailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          alert('A verification email has been sent to the email address.');
          this.firebaseService.addDeskTMONoPhoto(this.deskTMO);
          console.log('Desk TMO added with no image added');
          this.thisDialogRef1.close('Closed');
      });
    });
  }



  register(email, password) {

    this.duplicateEmail = false;
    this.invalidEmail = false;
    this.weakPassword = false;

    let complete = true;

    if (this.fName != null
    && this.lName != null
    && this.email != null
    && this.password != null)
    {

      this.name = this.fName + ' ' + this.lName;

          this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((res) => {
            // upload image
            res.updateProfile({
              displayName: this.name,
              photoURL: '',
            });
            this.sendemailVerification();
            console.log(res);
            // storing user information to realtime database
            this.deskTMO = {
              'fName': this.fName,
              'lName': this.lName,
              'password': this.password,
              'emailAddress': this.email,
              'access': 2,
              'enabled': 'yes',
              'path': null
            };


          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
              this.duplicateEmail = true;
              console.log(errorCode);
            } else if ( errorCode === 'auth/invalid-email') {
              this.invalidEmail = true;
              console.log(errorCode);
            } else if (errorCode === 'auth/weak-password') {
              this.weakPassword = true;
              console.log(errorCode);
            }
          });

    } else {
      complete = false;
    }

  }

  /*
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
  } */

  /*
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

  }*/

  onCancel() {
    this.thisDialogRef1.close('Cancel');
  }

}
