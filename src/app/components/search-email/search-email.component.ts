import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search-email',
  templateUrl: './search-email.component.html',
  styleUrls: ['./search-email.component.css']
})
export class SearchEmailComponent implements OnInit {


  searchValue: string;

  usersDeskDb: any;
  usersDesk: any = [];
  result: any;
  found: boolean;

  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService
  ) { 
    this.usersDeskDb = this.firebaseService.getDeskTMO();

      this.usersDeskDb.subscribe(snapshot => {
        var j = 0;
        snapshot.forEach(snap => {
          this.usersDesk[j] = snap;
          j++;
        })
      });
  }

  ngOnInit() {
  }

  onSearch(){
    this.found = false;
    this.searchEmail();
  }

  searchEmail(){
    for(let i = 0; i < this.usersDesk.length; i++){
      if(this.usersDesk[i].emailAddress.toLowerCase() == this.searchValue.toLowerCase()){
        this.result = this.usersDesk[i];
        this.found = true;
        break;
      }
    }
  }

  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
