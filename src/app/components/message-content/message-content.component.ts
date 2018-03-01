import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagesComponent } from '../messages/messages.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { NgxAutoScroll } from 'ngx-auto-scroll';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.css']
})
export class MessageContentComponent implements OnInit {


  content: any;
  chatMessages: any;
  chatMessage: any;
  user: any;
  message: any;
  messageObject: any;

  constructor(
    public thisDialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    angularFireAuth: AngularFireAuth
  ) {
    this.user = angularFireAuth.auth.currentUser;
    console.log(this.user);
    this.content = data;
    this.chatMessages = this.firebaseService.getMessage(this.content.$key);
    console.log(this.chatMessages);
  }

  ngOnInit() {
    this.firebaseService.getMessage(this.content.$key).subscribe(message => {
      console.log(message);
      this.chatMessage = message;
    });
  }

  sendMessage() {
    console.log(this.message);
    this.messageObject = {
      'messageSender' : 'Admin: ' + this.user.displayName,
      'timeStamp': moment().format('MMMM Do YYYY, h:mm a'),
      message: this.message
    };
    if (this.message !== ' ')
    {
      this.firebaseService.addMessage(this.messageObject, this.content.$key);
    }
    this.message = '';
  }


  onClose() {
    this.thisDialogRef.close('Close');

  }
}
