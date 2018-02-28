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

  current: any;

  constructor(
    private router: Router,
    public angularFireAuth: AngularFireAuth
  ) {
    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
    this.angularFireAuth.auth.signOut();
    console.log(this.angularFireAuth.auth.currentUser);
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }


}
