import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectoryComponent } from '../directory/directory.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-add-directory',
  templateUrl: './add-directory.component.html',
  styleUrls: ['./add-directory.component.css']
})

export class AddDirectoryComponent implements OnInit {

  directory: any;
  category: string;
  directoryName: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
  otherInformation?: string;



  categoryControl = new FormControl('', [Validators.required]);

    categories = [
      {name: 'Fire', value: 'Fire'},
      {name: 'Medical', value: 'Medical'},
      {name: 'Police', value: 'Police'},
      {name: 'Terminal', value: 'Terminal'},
    ];

  constructor(
    public thisDialogRef: MatDialogRef<DirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar
    ) {
      // this.currentUser = this.firebaseService.getCurrent();
      // this.fName = this.currentUser.fName;
      // this.lName = this.currentUser.lName;

     }

    ngOnInit() {

    }


    onAdd(directory) {
      let complete = false;
      if (this.category == null) {
        complete = false;
      } else if (this.directoryName == null) {
        complete = false;
      } else if (this.address == null) {
        complete = false;
      } else if (this.contactNumber == null) {
        complete = false;
      } else if (this.operatingHours == null) {
        complete = false;
      } else {
        complete = true;
      }

      if (complete) {

        if (this.otherInformation == null) { // if without otherInformation
          this.directory = {
            'category': this.category,
            'directoryName': this.directoryName,
            'address': this.address,
            'contactNumber': this.contactNumber,
            'operatingHours': this.operatingHours,
            'otherInformation': null,
          };

          this.firebaseService.addDirectory(this.directory);
          console.log('Directory added');
          this.thisDialogRef.close('ADD');
        } else { // if with otherInformation
          this.directory = {
            'category': this.category,
            'directoryName': this.directoryName,
            'address': this.address,
            'contactNumber': this.contactNumber,
            'operatingHours': this.operatingHours,
            'otherInformation': this.otherInformation,
          };

          this.firebaseService.addDirectory(this.directory);
          console.log('Directory added');
          this.thisDialogRef.close('ADD');
        }


      } else {
        console.log('Please fill in all required fields.');

      }



    }


    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
