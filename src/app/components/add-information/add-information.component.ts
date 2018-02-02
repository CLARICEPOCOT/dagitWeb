import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { InformationComponent } from '../information/information.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.css']
})
export class AddInformationComponent implements OnInit {

  information: any;
  title: string;
  body: string;

  constructor(
    public thisDialogRef: MatDialogRef<InformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  onAdd(information) {
    this.information = {
      'title': this.title,
      'body': this.body
    };
    console.log('Information added');
    this.thisDialogRef.close('Add');

    this.firebaseService.addInformation(this.information);

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
