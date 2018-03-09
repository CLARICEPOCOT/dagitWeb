import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { InformationComponent } from '../information/information.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.css']
})
export class AddInformationComponent implements OnInit {

  information: any;
  title: string;
  body: string;

  currentUser: any;

  constructor(
    public thisDialogRef: MatDialogRef<InformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    public angularFireAuth: AngularFireAuth
  ) {
      this.currentUser = this.angularFireAuth.auth.currentUser.displayName;
  }

  ngOnInit() {
  }


  onAdd(information) {

    let complete = false;
    if (this.title != null && this.body != null) {
      complete = true;
    } else {
      console.log('Please fill in all the required fields.');
    }
    if (complete) {
      this.information = {
      'title': this.title,
      'body': this.body,
      'deskTMO': this.currentUser
    };
    console.log('Information added');
    this.thisDialogRef.close('Add');
    this.firebaseService.addInformation(this.information);
    }


  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
