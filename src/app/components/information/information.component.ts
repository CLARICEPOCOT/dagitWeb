import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddInformationComponent} from '../add-information/add-information.component';
import { EditInformationComponent } from '../edit-information/edit-information.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  dialogResult = '';
  editDialogResult = '';
  information: any;
  allInformation: any;
  id: any;
  current: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {

    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
    this.allInformation = this.firebaseService.getInformation();
   }

  ngOnInit() {
    this.firebaseService.getInformation().subscribe(information => {
      console.log(information);
      this.information = information;
    });

  }

  openAdd() {
    const dialogRef = this.dialog.open(AddInformationComponent, {
      width: '800px',
      data: 'ADD NEW INFORMATION'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogResult = result;
  });
  }

  onEditInformation(information) {
    const dialogRef = this.dialog.open(EditInformationComponent, {
      width: '800px',
      data: information
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log ('Dialog closed');
      this.editDialogResult = result;
    });
  }



  onDeleteInformation(key) {
    this.firebaseService.deleteInformation(key);
  }


}
