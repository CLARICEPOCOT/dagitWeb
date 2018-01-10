import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search-accounts',
  templateUrl: './search-accounts.component.html',
  styleUrls: ['./search-accounts.component.css']
})
export class SearchAccountsComponent implements OnInit {
  category: string;
  searchValue: string;
  onField: any;
  desk: any;
  allFName: any = [];
  allLName: any = [];
  onFieldFName: any = [];
  onFieldLName: any = [];
  deskFName: any = [];
  deskLName: any = [];
  found: boolean;


  categoryControl = new FormControl('', [Validators.required]);

    categories = [
      {name: 'All', value: 'All'},
      {name: 'On-field TMO', value: 'On-field TMO'},
      {name: 'Desk TMO', value: 'Desk TMO'},
    ];

  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    ) {
        this.onField = this.firebaseService.getOnfieldTMO();
        this.desk = this.firebaseService.getDeskTMO() ;

        let i = 0;
        let z = 0;
        this.desk.subscribe( snapshots => {
          snapshots.forEach( snapshot => {
            this.deskFName[i] = snapshot.val().fName;
            this.deskLName[i] = snapshot.val().lName;
            this.allFName[z] = snapshot.val().fName;
            this.allLName[z] = snapshot.val().lName;
            i++;
            z++;
          });
        });

        let j = 0;
        this.onField.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.onFieldFName[j] = snapshot.val().fName;
            this.onFieldLName[j] = snapshot.val().lName;
            this.allFName[z] = snapshot.val().fName;
            this.allLName[z] = snapshot.val().lName;
            j++;
            z++;
          });
        });



      } // end of constructor

    ngOnInit() {
    }

    display() {
      for (const fName of this.allFName) {
        console.log(fName);
      }
      return; 
    }

    onSearch() {
      const search = this.searchValue;
      const filter = this.category;
      this.found = false;

      if (filter === 'All') {
        for (const fName of this.allFName) {
          if (search.localeCompare(fName)) {
            this.found = true;
          } else {
            for (const lName of this.allLName) {
              if (search.localeCompare(lName)) {
                this.found = true;
              }
            }
          }
        }

      } else if (filter === 'On-field TMO') {
        for (const fName of this.onFieldFName) {
          if (search.localeCompare(fName)) {
            this.found = true;
          } else {
            for (const lName of this.onFieldLName) {
              if ( search.localeCompare(lName)) {
                this.found = true;
              }
            }
          }

        }


      } else if (filter === 'Desk TMO') {
        for (const fName of this.deskFName) {
          if (search.localeCompare(fName)) {
            this.found = true;
          } else {
            for (const lName of this.deskLName) {
              if (search.localeCompare(lName)) {
                this.found = true;
              }
            }
          }
        }

      } else {
        this.found = false;
      }

      // this.thisDialogRef.close('Add');

    }


    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
