import { Component, OnInit, ViewEncapsulation, Inject,  ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from '../notifications/notifications.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';

@Component({
  selector: 'app-add-traffic',
  templateUrl: './add-traffic.component.html',
  styleUrls: ['./add-traffic.component.css']
})
export class AddTrafficComponent implements OnInit {

  notification: any;
  rating: string;
  location: string;
  category: string;
  notifDetail: string;


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

  current: any;
  fName: string;
  lName: string;

  mapData: any;
  mapUpdate: any;


  timeStamp = moment().format('MMMM Do YYYY, h:mm A');

  categoryControl = new FormControl('', [Validators.required]);

      categories = [
        {name: 'Light', value: 'Light Traffic'},
        {name: 'Moderate', value: 'Moderate Traffic'},
        {name: 'Heavy', value: 'Heavy Traffic'}
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
        'category': 'Traffic',
        'timeStamp': this.timeStamp,
        'notifDetail': this.rating + ': ' + this.loc,
        'fName': this.current,
        'lName': '',
        'sort' : 0 - Date.now()
      };


      // updating NOTIFICATIONS
      this.firebaseService.addNotification(this.notification);
      console.log('Notification added');
      // updating LOGS
      const date = moment().format('MMMM D YYYY');
      this.firebaseService.addNotifLog(date, this.notification);


      console.log(location);
      // updating MAPS
      this.mapUpdate = {
        'tlatitude': this.latitude,
        'tlongitude': this.longitude,
        'trafficRating': this.rating,
        'trafficTimeStamp': this.timeStamp,
        'tFName': this.current,
        'tLName': ''
      };


     this.firebaseService.updateMapData(this.loc, this.mapUpdate);
     this.thisDialogRef.close('Add');
    }

  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
