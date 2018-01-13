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
     }

    ngOnInit() {
    }


    onEdit(key, directory) {
      // tslint:disable-next-line:triple-equals
      if (this.newCategory != null) {
        this.category = this.newCategory;
      } else {
        this.category = this.directory.category;
      }

      if (this.newDirectoryName != null) {
        this.directoryName = this.newDirectoryName;
      } else {
        this.directoryName = this.directory.directoryName;
      }

      if (this.newAddress != null) {
        this.address = this.newAddress;
      } else {
        this.address = this.directory.address;
      }

      if (this.newContactNumber != null) {
        this.contactNumber = this.newContactNumber;
      } else {
        this.contactNumber = this.directory.contactNumber;
      }

      if (this.newOperatingHours != null) {
        this.operatingHours = this.newOperatingHours;
      } else {
        this.operatingHours = this.directory.operatingHours;
      }

      if (this.newOtherInformation != null) {
        this.otherInformation = this.newOtherInformation;
      } else {
        if (this.directory.otherInformation == null) {
          this.otherInformation = null;
        } else {
          this.otherInformation = this.directory.otherInformation;
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
      console.log('Directory added');
      this.thisDialogRef.close('Add');

    }


    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
