import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDirectoryComponent } from '../add-directory/add-directory.component';
import { SearchDirectoryComponent} from '../search-directory/search-directory.component';
import { EditDirectoryComponent} from '../edit-directory/edit-directory.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DirectoryComponent implements OnInit {

  dialogResult = '';
  searchResult = '';
  editDialogResult = '';
  directory: any;
  directories: any;
  id: any;



  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
    ) {
      this.directories = this.firebaseService.getDirectory();
   }

  ngOnInit() {

    this.firebaseService.getDirectory().subscribe(directory => {
      console.log(directory);
      this.directory = directory;
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDirectoryComponent, {
      width: '800px',
      data: 'ADD NEW DIRECTORY'

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.dialogResult = result;
  });
  }

  openSearch() {
    const dialogRef = this.dialog.open(SearchDirectoryComponent, {
      width: '800px',
      data: 'SEARCH DIRECTORY'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log ('Dialog closed');
      this.searchResult = result;
    });

  }

  openEdit(directory) {
    const dialogRef = this.dialog.open(EditDirectoryComponent, {
      width: '800px',
      data: directory
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log ('Dialog closed');
      this.editDialogResult = result;
    });

  }

  onDeleteClick(key) {
    this.firebaseService.deleteDirectory(key);
  }

}
