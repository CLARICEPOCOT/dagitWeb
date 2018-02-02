import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class FirebaseService {

  currentUser: any;
  deskTMOfolder: any;
  onFieldTMOFolder: any;
  directory: any;
  constructor(public dagit: AngularFireDatabase) {
    this.deskTMOfolder = 'deskTMOImages';
    this.onFieldTMOFolder = 'onFieldTMOImages';
  }

// DIRECTORY
  addDirectory(directory) {
    this.dagit.list('/DIRECTORY').push(directory);
  }

  getDirectory() {
    return this.dagit.list('/DIRECTORY');
  }

  getDirectoryDetails(id) {
    this.directory = this.dagit.object('/DIRECTORY/' + id) ;
    return this.directory;
  }

  updateDirectory(id, directory) {
    return this.dagit.list('/DIRECTORY').update(id, directory);
  }

  deleteDirectory(key) {
    return this.dagit.list('/DIRECTORY').remove(key);
  }

// DESK TMO

  addDeskTMO(deskTMO) {

    // create root ref
    const storageRef = firebase.storage().ref();
    for ( const selectedFile of
      [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
        const path = `/${this.deskTMOfolder}/${selectedFile.name}`;
        const iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          deskTMO.image = selectedFile.name;
          deskTMO.path = path;
          return this.dagit.list('/ACCOUNTS/DESK_TMO').push(deskTMO);
        });

    }

  }

  addDeskTMONoPhoto(deskTMO) {
    this.dagit.list('/ACCOUNTS/DESK_TMO').push(deskTMO);
  }

  getDeskTMODetails() {
    return this.dagit.list('/ACCOUNTS/DESK_TMO', {
      preserveSnapshot: true
    });
  }

  getDeskTMO() {
    return this.dagit.list('/ACCOUNTS/DESK_TMO');
  }

  deskTMODetails(key) {
    return this.dagit.object('/ACCOUNTS/DESK_TMO' + key);
  }

  updateDeskTMO(id, deskTMO) {
    return this.dagit.list('/ACCOUNTS/DESK_TMO').update(id, deskTMO);
  }

  deleteDeskTMO(key) {
    return this.dagit.list('/ACCOUNTS/DESK_TMO').remove(key);
  }

// ON-FIELD TMO

  addOnfieldTMO(onFieldTMO) {
    const storageRef = firebase.storage().ref();
    for ( const selectedFile of
      [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
        const path = `/${this.onFieldTMOFolder}/${selectedFile.name}`;
        const iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          onFieldTMO.image = selectedFile.name;
          onFieldTMO.path = path;
          return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO').push(onFieldTMO);
        });

    }
  }

  addOnFieldTMONoPhoto(onFieldTMO) {
    this.dagit.list('/ACCOUNTS/ON_FIELD_TMO').push(onFieldTMO);
  }

  getOnfieldTMO() {
    return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO');
  }

  getOnfieldTMODetails() {
    return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO', {
      preserveSnapshot: true
    });
  }

  onFieldTMODetails(key) {
    return this.dagit.object('/ACCOUNTS/ON_FIELD_TMO' + key);
  }

  updateOnfieldTMO(id, onFieldTMO) {
    return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO').update(id, onFieldTMO);
  }

  deleteOnfieldTMO(key) {
    return this.dagit.list('/ACCOUNTS/ON_FIELD_TMO').remove(key);
  }


// NOTIFICATIONS

  addNotification(notification) {
    this.dagit.list('/NOTIFICATIONS').push(notification);
  }

  getNotification() {
    return this.dagit.list('/NOTIFICATIONS', {
      query: {
        orderByChild: 'sort'
      }
    });
  }

  updateNotification(id, notification) {
    return this.dagit.list('/NOTIFICATION').update(id, notification);
  }

  deleteNotification(key) {
    return this.dagit.list('/NOTIFICATION').remove(key);
  }


<<<<<<< HEAD
// INFORMATION

  addInformation(information) {
    this.dagit.list('/INFORMATION').push(information);
  }

  getInformation() {
    return this.dagit.list('/INFORMATION');
  }

  updateInformation(id, information) {
    return this.dagit.list('/INFORMATION').update(id, information);
  }

  deleteInformation(key) {
    return this.dagit.list('INFORMATION').remove(key);
  }
=======
  storeCurrent(user) {
    this.dagit.list('/CURRENTDESK').push(user);
  }

  getCurrent() {
    return this.dagit.list('/CURRENTDESK', {
      preserveSnapshot: true
  });
 }


>>>>>>> master

}


// not used
interface Directory {
  $key: string;
  category: string;
  directoryName: string;
  directoryAddress: string;
  directoryContactNumber: string;
  directoryOperatingHours: string;
  directoryOtherInfo?: string;

}

interface DeskTMO {
  $key: string;
  fName: string;
  lName: string;
  username: string;
  password: string;
  emailAddress: string;
  accountPicture?: string;

}
