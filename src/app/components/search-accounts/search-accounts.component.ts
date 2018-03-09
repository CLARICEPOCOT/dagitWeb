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

  usersDeskDb: any;
  usersOfDb: any;
  usersDesk: any = [];
  usersOf: any = [];
  result: any = [];
  found: boolean;


  categoryControl = new FormControl('', [Validators.required]);

    categories = [
      {name: 'All', value: 'All'},
      {name: 'On-field TMO', value: 'onField'},
      {name: 'Desk TMO', value: 'desk'}
    ];

  constructor(
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    ) {
        this.usersOfDb = this.firebaseService.getOnfieldTMO();
        this.usersDeskDb = this.firebaseService.getDeskTMO() ;

        this.usersDeskDb.subscribe(snapshot => {
          var i = 0;
        snapshot.forEach(snap => {
            this.usersDesk[i] = snap;
          i++;
          })
        });
         
        this.usersOfDb.subscribe(snapshot => {
         var j = 0;
        snapshot.forEach(snap => {
            this.usersOf[j] = snap;
           j++;
          })
        });
      } // end of constructor

    ngOnInit() {
    }

    onSearch(){
      let complete = false;
      if (this.category != null && this.searchValue != null) {
        complete = true;
      }

      if (complete) {
        this.result.length = 0;
        this.found = false;
        console.log(this.category);
        if(this.category == 'desk'){
          this.searchDesk();
        }
        else if(this.category == 'onField'){
          this.searchOf();
        }
        else{
          this.searchDesk();
          this.searchOf();
        }
      }
      
    }

    searchDesk(){
      for(let i = 0; i < this.usersDesk.length; i++){
        if(this.usersDesk[i].lName.toLowerCase().search(this.searchValue.toLowerCase()) != -1){
          this.result[this.result.length] = this.usersDesk[i];
          this.found = true;
        }
      }
    }
  
    searchOf(){
      for(let i = 0; i < this.usersOf.length; i++){
        if(this.usersOf[i].lName.toLowerCase().search(this.searchValue.toLowerCase()) != -1){
          this.result[this.result.length] = this.usersOf[i];
          this.found = true;
        }
      }
    }

    searchAll(){
      let j = 0;
      for(let i = 0; i < this.usersOf.length; i++){
        if(this.usersOf[i].lName.toLowerCase().search(this.searchValue.toLowerCase()) != -1){
          this.result[this.result.length] = this.usersOf[i];
          this.found = true;
        }
      }
    }

    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
