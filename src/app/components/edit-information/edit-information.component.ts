import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { InformationComponent } from '../information/information.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.css']
})
export class EditInformationComponent implements OnInit {

  information: any;
  title: string;
  body: string;

  newTitle: string;
  newBody: string;
  currentUser: any;

  constructor(
    public thisDialogRef: MatDialogRef<InformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    public angularFireAuth: AngularFireAuth
  ) {
    this.information = data;
    this.newTitle = this.information.title;
    this.newBody = this.information.body;
    this.currentUser = this.angularFireAuth.auth.currentUser.displayName;
  }

  ngOnInit() {
  }


  onEdit(key, information) {
    // tslint:disable-next-line:triple-equals
    if (this.newTitle != this.information.title) {
      this.title = this.newTitle;
    } else {
      this.title = this.information.title;
    }

    // tslint:disable-next-line:triple-equals
    if (this.newBody != this.information.body) {
      this.body = this.newBody;
    } else {
      this.body = this.information.body;
    }


    this.information = {
      'title': this.title,
      'body': this.body,
      'deskTMO': this.currentUser
    };


    this.firebaseService.updateInformation(key, this.information);
    console.log('Information edited');
    this.thisDialogRef.close('Edit');

  }

  onCancel() {
    this.thisDialogRef.close('Cancel');

  }


}
