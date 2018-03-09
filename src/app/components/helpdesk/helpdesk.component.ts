import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HelpdeskComponent implements OnInit {

  current: any;
  
  unreadM = false;
  unreadV = false;
  unreadA = false;
  unreadP = false;

  messages: any;
  message: any = [];

  violations: any;
  violation: any = [];

  pedicabs: any;
  pedicab: any = [];

  accidents: any;
  accident: any = [];


  constructor(
    public router: Router,
    public angularFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public firebaseApp: FirebaseApp
  ) {
    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
    
    this.messages = this.firebaseService.getMessages();
    this.violations = this.firebaseService.getViolations();
    this.pedicabs = this.firebaseService.getPedicabReports();
    this.accidents = this.firebaseService.getAccidents();

    this.messages.subscribe( snapshot => {
      let i = 0;
      snapshot.forEach(snap => {
        this.message[i] = snap;
        i++;
      });0
    });
    
    this.violations.subscribe( snapshot => {
      let i = 0;
      snapshot.forEach(snap => {
        this.violation[i] = snap;
        i++;
      });
    });

    this.pedicabs.subscribe( snapshot => {
      let i = 0;
      snapshot.forEach(snap => {
        this.pedicab[i] = snap;
        i++;
      });
    });

    this.accidents.subscribe( snapshot => {
      let i = 0;
      snapshot.forEach(snap => {
        this.accident[i] = snap;
        i++;
      });
    });
  }

  ngOnInit() {
    for(var i = 0; i < this.message.length; i++){
      if(this.message[i].status == 'unread'){
        this.unreadM = true;
      }
    }

    for(var i = 0; i < this.violation.length; i++){
      if(this.violation[i].status == 'unread'){
        this.unreadV = true;
      }
    }

    for(var i = 0; i < this.pedicab.length; i++){
      if(this.pedicab[i].status == 'unread'){
        this.unreadP = true;
      }
    }

    for(var i = 0; i < this.accident.length; i++){
      if(this.accident[i].status == 'unread'){
        this.unreadA = true;
      }
    }
  }

}
