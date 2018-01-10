import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-onfield',
  templateUrl: './add-onfield.component.html',
  styleUrls: ['./add-onfield.component.css']
})
export class AddOnfieldComponent implements OnInit {

  onFieldTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: string;
  image?: string;
  

  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  onAdd(onFieldTMO) {
    this.onFieldTMO = {
      'fName': this.fName,
      'lName': this.lName,
      'username': this.username,
      'password': this.password,
      'location': this.location,
    };
    this.firebaseService.addOnfieldTMO(this.onFieldTMO);
    console.log('Directory added');
    this.thisDialogRef2.close('Add');


  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }

}
