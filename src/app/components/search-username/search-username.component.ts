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

  usersOfDb: any;
  usersOf: any = [];
  result: any;
  found: boolean;
  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService
  ) {
      this.usersOfDb = this.firebaseService.getOnfieldTMO();

      this.usersOfDb.subscribe(snapshot => {
        var j = 0;
        snapshot.forEach(snap => {
          this.usersOf[j] = snap;
          j++;
        })
      });
  }

  ngOnInit() {
  }

  onSearch(){
    this.found = false;
    this.searchUsername();
  }

  searchUsername(){
    for(let i = 0; i < this.usersOf.length; i++){
      if(this.usersOf[i].username.toLowerCase() == this.searchValue.toLowerCase()){
        this.result = this.usersOf[i];
        this.found = true;
        break;
      }
    }
  }

  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
