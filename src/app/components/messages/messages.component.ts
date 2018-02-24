import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageContentComponent } from '../message-content/message-content.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  messages: any;
  message: any;
  messageContent: '';

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {
    this.messages = this.firebaseService.getMessages();
    // console.log(this.messages);
  }

  ngOnInit() {
    this.firebaseService.getMessages().subscribe(message => {
      // console.log(message);
      this.message = message;
    });
  }



  open(message) {
    const dialogRef = this.dialog.open(MessageContentComponent, {
      width: '800px',
      data: message

    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.messageContent = result;
  });
  }

}
