import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    public angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.auth.signOut();
    console.log(this.angularFireAuth.auth.currentUser);
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }


}
