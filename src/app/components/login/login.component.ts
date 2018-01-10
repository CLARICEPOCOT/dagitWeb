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

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.userInfo = this.firebaseService.getDeskTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.confirmUser[i] = snapshot.val().username;
        this.confirmPass[i] = snapshot.val().password;
        i++;
      });
    });


  }

  ngOnInit() {
  }

  checkUser() {
    let check = false;
   // console.log(this.confirmUser[0]);
    for (let i = 0; i < this.confirmUser.length; i++) {
    // console.log(this.confirmUser[i]);
        // tslint:disable-next-line:triple-equals
        if (this.tempUser == this.confirmUser[i]) {
          // tslint:disable-next-line:triple-equals
          if (this.tempPass == this.confirmPass[i]) {
            check = true;
            this.router.navigate(['/map']);
            console.log('Logged in');
          }
        }
    }

    if (!check)
    {
      console.log('Invalid credentials');
    }

  }

}
