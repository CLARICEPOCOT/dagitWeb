import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  current: any;


  constructor(public angularFireAuth: AngularFireAuth) {
    this.current = this.angularFireAuth.auth.currentUser;
  }

  ngOnInit() {
  }

}
