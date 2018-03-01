import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'firebase/storage';



@Injectable()
export class FirebaseService {

  currentUser: any;
  deskTMOfolder: any;
  onFieldTMOfolder: any;
  directory: any;


  constructor(public dagit: AngularFireDatabase) {
    this.deskTMOfolder = 'deskTMOImages';
    this.onFieldTMOfolder = 'onFieldTMOImages';
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


  addDeskImage(deskTMO, file) {
    // create root ref
    const storageRef = firebase.storage().ref();
    const path = `/${this.deskTMOfolder}/${file.name}`;
    const uploadTask = storageRef.child(path).put(file)
    .then((snapshot) => {
      const url = snapshot.downloadURL;
      console.log(url);
      this.dagit.object('/ACCOUNTS/DESK_TMO/' + deskTMO.$key + '/path/').set(url);
    });
  }

  uploadGetDeskPhoto(user){
    return this.dagit.object('ACCOUNTS/DESK_TMO/' + user.$key);
  }

  addDeskTMONoPhoto(deskTMO) {
    this.dagit.list('/ACCOUNTS/DESK_TMO').push(deskTMO);
  }

  getDeskTMODetails() {
    return this.dagit.list('/ACCOUNTS/DESK_TMO', {
      preserveSnapshot: true
    });
  }

  editPassword(key, newPass){
    this.dagit.object('/ACCOUNTS/DESK_TMO/' + key + '/password').set(newPass);
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

  editEnabledD(val , key){
    this.dagit.object('/ACCOUNTS/DESK_TMO/' + key + '/enabled').set(val);
  }

// ON-FIELD TMO

  editEnabledOF(val, key){
    this.dagit.object('/ACCOUNTS/ON_FIELD_TMO/' + key + '/enabled').set(val);
  }


  addOnfieldTMO(onFieldTMO) {
    const storageRef = firebase.storage().ref();
    for ( const selectedFile of
      [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
        const path = `/${this.onFieldTMOfolder}/${selectedFile.name}`;
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


  addOnFieldImage(onFieldTMO, file) {
    // create root ref
    const storageRef = firebase.storage().ref();
    const path = `/${this.onFieldTMOfolder}/${file.name}`;
    const uploadTask = storageRef.child(path).put(file)
    .then((snapshot) => {
      const url = snapshot.downloadURL;
      this.dagit.object('/ACCOUNTS/ON_FIELD_TMO/' + onFieldTMO.$key + '/path/').set(url);
    });
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


// NOTIFICATION LOGS
  addNotifLog(date, notification) {
    this.dagit.list('/LOGS/' + date).push(notification);
  }

  getNotifLog(date) {
    return this.dagit.list('/LOGS/' + date, {
      query: {
        orderByChild: 'sort'
      }
    });
  }


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
    return this.dagit.list('/INFORMATION').remove(key);
  }

  // ACCIDENT REPORTS

  getAccidents() {
    return this.dagit.list('/ACCIDENT');
  }

  readAccidents(user){
    this.dagit.object('/ACCIDENT/' + user.$key + '/status').set('read');
  }

  // VIOLATION REPORTS

  getViolations() {
    return this.dagit.list('/VIOLATION');
  }

  readViolations(user){
    this.dagit.object('/VIOLATION/' + user.$key + '/status').set('read');
  }

  // PEDICAB REPORTS

  getPedicabReports() {
    return this.dagit.list('/PEDICAB');
  }

  readPedicab(user){
    this.dagit.object('/PEDICAB/' + user.$key + '/status').set('read');
  }

  // MESSAGES

  readMessage(user){
    this.dagit.object('/CHAT/' + user.$key + '/status').set('read');
  }

  getMessages() {
    return this.dagit.list('/CHAT');
  }

  getMessage(user) {
    return this.dagit.list('/CHAT/' + user);
  }

  addMessage(message, user) {
    this.dagit.list('/CHAT/' + user).push(message);
  }

  // MAP
  getMap(location) {
    return this.dagit.list('/MAP/' + location);
  }

  getMapData(location) {
    return this.dagit.list('/MAP/' + location);
  }

  updateMapData(location, update) {
    this.dagit.object('/MAP/' + location).update(update);
  }

  addMapData(location, update) {
    this.dagit.list('/MAP/' + location).push(update);
  }

   // MAP DATA
  addMapLocations(coordinates) {
    this.dagit.list('/MAP').push(coordinates);
  }


  getMapUpdates() {
  return this.dagit.list('/MAP');
}

  trackLocation() {
    return this.dagit.list('/LOCATION');
  }



  // TEMPORARY SESSIONS
  storeCurrent(user) {
    this.dagit.list('/CURRENTDESK').push(user);
  }

  getCurrent() {
    return this.dagit.list('/CURRENTDESK', {
      preserveSnapshot: true
  });
 }



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


