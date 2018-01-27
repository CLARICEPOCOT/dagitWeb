import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  tempUser: any;
  tempPass: any;
  userInfo: any;
  confirmUser: any[] = [];
  confirmPass: any[] = [];
  check: boolean;

  currentUser: any;
  fName: any[] = [];
  lName: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.userInfo = this.firebaseService.getDeskTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.fName[i] = snapshot.val().fName;
        this.lName[i] = snapshot.val().lName;
        this.confirmUser[i] = snapshot.val().username;
        this.confirmPass[i] = snapshot.val().password;
        i++;
      });
    });


  }

  ngOnInit() {
  }

  checkUser() {
    this.check = false;
   // console.log(this.confirmUser[0]);
    for (let i = 0; i < this.confirmUser.length; i++) {
    // console.log(this.confirmUser[i]);
        // tslint:disable-next-line:triple-equals
        if (this.tempUser == this.confirmUser[i]) {
          // tslint:disable-next-line:triple-equals
          if (this.tempPass == this.confirmPass[i]) {
            this.check = true;
            this.currentUser = {
              'fName': this.fName[i],
              'lName': this.lName[i]
            };
            this.firebaseService.storeCurrent(this.currentUser);
            this.router.navigate(['/map']);
            console.log('Logged in');
          }
        }
    }

    if (!this.check) {
      console.log('Invalid credentials');
    }

  }

}
