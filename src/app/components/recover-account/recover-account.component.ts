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
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  recover(email) {
    console.log('function');
    let noError = true;
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .catch(function(error){
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode === 'auth/invalid-email') {
        console.log('invalid email');
        noError = false;
      } else if (errorCode === 'auth/user-not-found') {
        console.log('user not found');
        noError = false;
      }
    })
    .then(() => {
      alert('Please check your email.');
      console.log('email sent');
      this.router.navigate(['/']);
    });
  }
}
