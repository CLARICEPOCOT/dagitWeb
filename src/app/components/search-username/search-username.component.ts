import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search-username',
  templateUrl: './search-username.component.html',
  styleUrls: ['./search-username.component.css']
})
export class SearchUsernameComponent implements OnInit {

  searchValue: string;

  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
