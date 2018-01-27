import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectoryComponent } from '../directory/directory.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-edit-directory',
  templateUrl: './edit-directory.component.html',
  styleUrls: ['./edit-directory.component.css']
})
export class EditDirectoryComponent implements OnInit {

  directory: any;
  category: string;
  directoryName: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
  otherInformation?: string;

  newCategory: string;
  newDirectoryName: string;
  newAddress: string;
  newContactNumber: string;
  newOperatingHours: string;
  newOtherInformation?: string;


  categoryControl = new FormControl('', [Validators.required]);

    categories = [
      {name: 'Fire', value: 'Fire'},
      {name: 'Medical', value: 'Medical'},
      {name: 'Police', value: 'Police'},
      {name: 'Terminal', value: 'Terminal'},
    ];

  constructor(
    public thisDialogRef: MatDialogRef<DirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    ) {
      this.directory = data;
      this.newCategory = this.directory.category;
      this.newDirectoryName = this.directory.directoryName;
      this.newAddress = this.directory.address;
      this.newContactNumber = this.directory.contactNumber;
      this.newOperatingHours = this.directory.operatingHours;
      this.newOtherInformation = this.directory.otherInformation;
     }

    ngOnInit() {
    }


    onEdit(key, directory) {
      // tslint:disable-next-line:triple-equals
      if (this.newCategory != this.directory.category) {
        this.category = this.newCategory;
      } else {
        this.category = this.directory.category;
      }

      // tslint:disable-next-line:triple-equals
      if (this.newDirectoryName != this.directory.directoryName) {
        this.directoryName = this.newDirectoryName;
      } else {
        this.directoryName = this.directory.directoryName;
      }

      // tslint:disable-next-line:triple-equals
      if (this.newAddress != this.directory.address) {
        this.address = this.newAddress;
      } else {
        this.address = this.directory.address;
      }

      // tslint:disable-next-line:triple-equals
      if (this.newContactNumber != this.directory.contactNumber) {
        this.contactNumber = this.newContactNumber;
      } else {
        this.contactNumber = this.directory.contactNumber;
      }

      // tslint:disable-next-line:triple-equals
      if (this.newOperatingHours != this.directory.operatingHours) {
        this.operatingHours = this.newOperatingHours;
      } else {
        this.operatingHours = this.directory.operatingHours;
      }

      // tslint:disable-next-line:triple-equals
      if (this.newOtherInformation != this.directory.otherInformation) {
        this.otherInformation = this.newOtherInformation;
      } else {
        if (this.directory.otherInformation == null) {
          this.otherInformation = null;
        } else {
          // tslint:disable-next-line:triple-equals
          if (this.newOtherInformation.length == 0) {
            this.otherInformation = null;
          } else {
            this.otherInformation = this.directory.otherInformation;
          }

        }
      }


      this.directory = {
        'category': this.category,
        'directoryName': this.directoryName,
        'address': this.address,
        'contactNumber': this.contactNumber,
        'operatingHours': this.operatingHours,
        'otherInformation': this.otherInformation,
      };


      this.firebaseService.updateDirectory(key, this.directory);
      console.log('Directory edited');
      this.thisDialogRef.close('Add');

    }


    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
