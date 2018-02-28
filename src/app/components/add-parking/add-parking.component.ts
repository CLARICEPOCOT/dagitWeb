import { Component, OnInit, ViewEncapsulation, Inject,  ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';


@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent implements OnInit {


   // for location
   public locationControl: FormControl;
   latitude: number;
   longitude: number;
   public place: any;
   loc: any;
   locLat: number;
   locLng: number;


   @ViewChild('location')
   public searchElementRef: ElementRef;

  notification: any;
  rating: string;
  category: string;
  notifDetail: string;

  /*
  current: any;
  dbFName: any[] = [];
  dbLName: any[] = [];*/
  current: any;
  fName: string;
  lName: string;

  /*
  today = new Date();

  date = (this.today.getMonth() + 1) + '/' + this.today.getDate() + '/' + this.today.getFullYear();
  hours = this.today.getHours() <= 12 ? this.today.getHours() : this.today.getHours() - 12;
  am_pm = this.today.getHours() >= 12 ? 'PM' : 'AM';
  hoursFormatted = this.hours < 10 ? '0' + this.hours : this.hours;
  minutes = this.today.getMinutes() < 10 ? '0' + this.today.getMinutes() : this.today.getMinutes();

  time = this.hoursFormatted + ':' + this.minutes + ' ' + this.am_pm;
  timeStamp = this.date + ' ' + this.time;*/
  timeStamp = moment().format('MMMM Do YYYY, h:mm a');

  categoryControl = new FormControl('', [Validators.required]);

      categories = [
        {name: 'Available', value: 'Available Parking'},
        {name: 'Not Available', value: 'No Available Parking'},
      ];

  constructor(
    public thisDialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public angularFireAuth: AngularFireAuth
  ) {
    /*
    this.current = this.firebaseService.getCurrent();

        let j = 0;
        this.current.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.dbFName[j] = snapshot.val().fName;
            this.dbLName[j] = snapshot.val().lName;
            j++;
          });
        });
        this.getUser();
        */
        this.current = this.angularFireAuth.auth.currentUser.displayName;
  }

  ngOnInit() {

    this.locationControl = new FormControl();

      const restrict = {
        componentRestrictions: {country: 'phl'}
      };

          // load places autocomplete
          this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, restrict);
            autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                // get the place result

                // end
                  const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                // verify result
                if (place.geometry === undefined || place.geometry === null) {
                  this.place = place;
                 //  this.location = place.geometry.location;
                  return;
                }
                // set place
                this.loc = place.formatted_address;

                // set latitude, longitude
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.locLat = place.geometry.location.lat();
                this.locLng = place.geometry.location.lng();

              });
            });
          });


  }


  rateParking(notification) {
    let complete = false;
    if (this.rating != null && this.loc != null) {
      complete = true;
    } else {
      console.log('Please fill in all the required fields.');
    }

    if (complete) {
      this.notification = {
        'category': 'Parking',
        'timeStamp': this.timeStamp,
        'notifDetail': this.rating + ': ' + this.loc,
        'fName': this.current,
        'lName': '',
        'sort': 0 - Date.now()
      };
      
      this.firebaseService.addNotification(this.notification);
      console.log('Notification added');
      this.thisDialogRef.close('Add');
    }

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

  /*
  getUser() {
    for ( let i = 0; i < this.dbFName.length; i++) {
       this.fName = this.dbFName[i];
    }

    for ( let j = 0; j < this.dbLName.length; j++) {
       this.lName = this.dbLName[j];
    }
  }*/

}
