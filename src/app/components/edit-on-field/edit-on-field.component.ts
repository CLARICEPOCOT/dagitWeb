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
  selector: 'app-edit-on-field',
  templateUrl: './edit-on-field.component.html',
  styleUrls: ['./edit-on-field.component.css']
})
export class EditOnFieldComponent implements OnInit {

  onFieldTMO: any;
  fName: string;
  lName: string;
  username: string;
  password: string;
  location: string;
  image?: string;
  accountOF: any;
  timeShift: any;


  newFName: string;
  newLName: string;
  newUsername: string;
  newPassword: string;
  newLocation: string;
  newtimeShift: string;
  newLocLat: any;
  newLocLng: any;

  // for location
  public locationControl: FormControl;
  public place: any;
  locLat: number;
  locLng: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;



  constructor(
    public thisDialogRef2: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
      this.accountOF = data;
      this.newPassword = this.accountOF.password;
      this.newLocation = this.accountOF.location;
      this.newtimeShift = this.accountOF.timeShift;
  }

  ngOnInit() {
    /*
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


                return;
              }
              // set place
              this.newLocation = place.formatted_address;

              // set latitude, longitude
              this.newLocLat = place.geometry.location.lat();
              this.newLocLng = place.geometry.location.lng();

            });
          });
        });*/
  }

  onEditOnfield(key, onFieldTMO) {

      const passwordLength = this.newPassword.trim().length;
      const timeShiftLength = this.newtimeShift.trim().length;
      const locationLength = this.newLocation.trim().length;
      let complete = false;
      if ((passwordLength !== 0)
         && ( timeShiftLength !== 0)
         && ( locationLength !== 0)) {
            complete = true;
      }

    if (complete) {
        // tslint:disable-next-line:triple-equals
    if (this.newPassword != this.accountOF.password) {
      this.password = this.newPassword;
    } else {
      this.password = this.accountOF.password;
    }

    if (this.newtimeShift !== this.accountOF.timeShift) {
      this.timeShift = this.newtimeShift;
    } else {
      this.timeShift = this.accountOF.timeShift;
    }

      // tslint:disable-next-line:triple-equals
    if (this.newLocation != this.accountOF.location) {
      this.location = this.newLocation;
     // this.locLat = this.newLocLat;
     // this.locLng = this.newLocLng;
    } else {
       this.location = this.accountOF.location;
      // this.locLat = this.accountOF.locLat;
      // this.locLng = this.accountOF.locLng;
    }

    this.onFieldTMO = {
      'timeShift': this.timeShift,
      'password': this.password,
      'location': this.location,
      // 'locLat': this.locLat,
      // 'locLng': this.locLng
    };
    this.firebaseService.updateOnfieldTMO(key, this.onFieldTMO);
    console.log('Account updated');
    this.thisDialogRef2.close('Edit');

      }



  }


  onCancel() {
    this.thisDialogRef2.close('Cancel');

  }


}
