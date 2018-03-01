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

   mapUpdate: any;

   mapData: any;


   @ViewChild('location')
   public searchElementRef: ElementRef;

  notification: any;
  rating: string;
  category: string;
  notifDetail: string;


  current: any;
  fName: string;
  lName: string;


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
        this.current = this.angularFireAuth.auth.currentUser.displayName;
        this.fName = this.current;
        /*this.mapData = this.firebaseService.getMapData(this.loc);
        console.log('MAP DATA: ' + this.mapData.trafficRating);
        if (this.mapData.trafficRating === undefined) {
          console.log('null');
          this.mapData.trafficRating = '';
          this.mapData.trafficTimeStamp = '';
          this.mapData.tFName = '';
          this.mapData.tLName = '';
        }*/
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
      // updating NOTIFICATIONS
      this.firebaseService.addNotification(this.notification);
      console.log('Notification added');

      console.log(location);
      // updating MAPS
      this.mapUpdate = {
        'platitude': this.latitude + 0.0001,
        'plongitude': this.longitude + 0.0001,
        'parkingAvailability': this.rating,
        'parkingTimeStamp': this.timeStamp,
        'pFName': this.current,
        'pLName': '',
        // 'trafficRating': this.mapData.trafficRating,
        // 'trafficTimeStamp': this.mapData.trafficTimeStamp,
        // 'tFName': this.mapData.tFName,
        // 'tLName': this.mapData.tLName
      };

     this.firebaseService.updateMapData(this.loc, this.mapUpdate);


      this.thisDialogRef.close('Add');
    }

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }



}
