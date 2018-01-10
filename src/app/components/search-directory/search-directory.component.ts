import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectoryComponent } from '../directory/directory.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search-directory',
  templateUrl: './search-directory.component.html',
  styleUrls: ['./search-directory.component.css']
})
export class SearchDirectoryComponent implements OnInit {

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
    ) {

     }

    ngOnInit() {
    }


    onSearch(directory) {
      this.thisDialogRef.close('Add');

    }


    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
