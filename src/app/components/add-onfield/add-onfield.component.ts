import { Component, OnInit, ViewEncapsulation, Inject,  ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';

@Component({
  selector: 'app-add-onfield',
  templateUrl: './add-onfield.component.html',
  styleUrls: ['./add-onfield.component.css']
})
export class AddOnfieldComponent implements OnInit {

  onFieldTMO: any;
  userInfo: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: any;
  timeShift: string;
  image: any;
  locLat: number;
  locLng: number;

  // for location
  public locationControl: FormControl;
  latitude: number;
  longitude: number;
  public place: any;

  dbUser: any[] = [];
  duplicateUser: boolean;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.userInfo = this.firebaseService.getOnfieldTMODetails();
    let i = 0;
    this.userInfo.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.dbUser[i] = snapshot.val().username;
        i++;
      });
    });
   }

  ngOnInit() {
    this.locationControl = new FormControl();

    // load places autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
       // types: ['street']

      });
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
          this.location = place.formatted_address;

          // set latitude, longitude
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.locLat = place.geometry.location.lat();
          this.locLng = place.geometry.location.lng();

        });
      });
    });

  }


  onCheck() {

    this.duplicateUser = false;

    for ( let j = 0; j < this.dbUser.length; j++ ) {
     // tslint:disable-next-line:triple-equals
     if (this.username != this.dbUser[j] ) {
      this.duplicateUser = false;
     } else {
       this.duplicateUser = true;
       break;
     }
    }


    if ( !this.duplicateUser) {
      this.onAdd(this.onFieldTMO);
    } else {
      console.log('duplicate username');
    }

  }

  onAdd(onFieldTMO) {
    let complete = false;
    if (
      this.fName != null &&
      this.lName != null &&
      this.username != null &&
      this.password != null &&
      this.location != null &&
      this.timeShift != null) {
        complete = true;

      } else {
        complete = false;
      }

      if (complete) {
        this.onFieldTMO = {
          'fName': this.fName,
          'lName': this.lName,
          'username': this.username,
          'password': this.password,
          'location': this.location,
          'timeShift': this.timeShift,
          'locLat': this.locLat,
          'locLng': this.locLng,
          'enabled': 'yes',
          'path': null
        };

        if (this.image != null) {
          this.firebaseService.addOnfieldTMO(this.onFieldTMO);
          console.log('Onfield TMO with image added');
          this.thisDialogRef2.close('ADD');
        } else {
          this.firebaseService.addOnFieldTMONoPhoto(this.onFieldTMO);
          console.log('Onfield TMO added with no image added');
          this.thisDialogRef2.close('ADD');

        }


      } else {
        console.log('Please fill in all the required fields.');
      }

  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }

  

}
