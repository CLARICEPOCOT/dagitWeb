import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  


  constructor() {

  }

  ngOnInit() {
  }

  login() {
   // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
   // this.afAuth.auth.signOut();
  }


}

