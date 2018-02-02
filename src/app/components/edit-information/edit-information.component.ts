import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { InformationComponent } from '../information/information.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

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

  constructor(
    public thisDialogRef: MatDialogRef<InformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
    this.information = data;
    this.newTitle = this.information.title;
    this.newBody = this.information.body;
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
      'body': this.body
    };


    this.firebaseService.updateInformation(key, this.information);
    console.log('Information edited');
    this.thisDialogRef.close('Edit');

  }

  onCancel() {
    this.thisDialogRef.close('Cancel');

  }


}
