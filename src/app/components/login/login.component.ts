import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { toast } from 'angular2-materialize';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  user: any;
  password: string;
  check: boolean;
  errorMessage: string;
  email: string;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public angularFireAuth: AngularFireAuth

  ) {

  }

  ngOnInit() {

  }

  login(email, password) {

    this.check = true;
    this.errorMessage = '';
    let complete = true;
    if (email != null && password != null) {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified) {
          console.log('logged in');
          this.user = this.angularFireAuth.auth.currentUser;
          this.user.password = password;
          console.log(user);
          this.router.navigate(['/map']);
        } else {
          this.sendemailVerification();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if ( errorCode === 'auth/invalid-email') {
          this.check = false;
          this.errorMessage = 'Invalid email address.';
          console.log('invalid email');
        }else if (errorCode === 'auth/user-not-found') {
          this.check = false;
          this.errorMessage = 'User not found.';
          console.log('User not found');
        }else if (errorCode === 'auth/wrong-password') {
         this.check = false;
         this.errorMessage = 'Incorrect password.';
         console.log('Incorrect password');
        }
      });
    } else {
      complete = false;
    }

  }



  sendemailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
      });
    });
  }



}
