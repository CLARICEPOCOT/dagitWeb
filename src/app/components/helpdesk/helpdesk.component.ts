import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HelpdeskComponent implements OnInit {

  current: any;

  constructor(
    public router: Router,
    public angularFireAuth: AngularFireAuth
  ) {
    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
