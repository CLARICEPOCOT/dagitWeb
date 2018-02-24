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
      {name: 'Desk TMO', value: 'Desk TMO'}
    ];

  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    ) {
        this.onField = this.firebaseService.getOnfieldTMO();
        this.desk = this.firebaseService.getDeskTMO() ;



      } // end of constructor

    ngOnInit() {
    }

    



    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
