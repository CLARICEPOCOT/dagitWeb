import { Component, OnInit, ViewEncapsulation, Inject,  ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectoryComponent } from '../directory/directory.component';
import { toast } from 'angular2-materialize';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';



@Component({
  selector: 'app-add-directory',
  templateUrl: './add-directory.component.html',
  styleUrls: ['./add-directory.component.css']
})

export class AddDirectoryComponent implements OnInit {

  directory: any;
  category: string;
  directoryName: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
  otherInformation?: string;

  users: any;
  currentUser: any;
  currentEmail: any;

   // for location
   public locationControl: FormControl;
   latitude: number;
   longitude: number;
   public place: any;
   location: any;
   locLat: number;
   locLng: number;

   @ViewChild('search')
   public searchElementRef: ElementRef;



  categoryControl = new FormControl('', [Validators.required]);

    categories = [
      {name: 'Fire', value: 'Fire'},
      {name: 'Medical', value: 'Medical'},
      {name: 'Police', value: 'Police'},
      {name: 'Terminal', value: 'Terminal'}
    ];

  constructor(
    public thisDialogRef: MatDialogRef<DirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService,
    public snackBar: MatSnackBar,
    public angularFireAtuh: AngularFireAuth,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
      // this.currentUser = this.firebaseService.getCurrent();
      // this.fName = this.currentUser.fName;
      // this.lName = this.currentUser.lName;
     // this.users = this.firebaseService.getDeskTMO();
      this.currentEmail = this.angularFireAtuh.auth.currentUser.email;
      this.currentUser = this.angularFireAtuh.auth.currentUser.displayName;
     }

    ngOnInit() {

      /*this.locationControl = new FormControl();

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
                this.address = place.formatted_address;
      
                // set latitude, longitude
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.locLat = place.geometry.location.lat();
                this.locLng = place.geometry.location.lng();
      
              });
            });
          });
      
          */
    }


    onAdd() {
      let complete = false;
      if (this.category == null) {
        complete = false;
      } else if (this.directoryName == null) {
        complete = false;
      } else if (this.address == null) {
        complete = false;
      } else if (this.contactNumber == null) {
        complete = false;
      } else if (this.operatingHours == null) {
        complete = false;
      } else {
        complete = true;
      }

      if (complete) {

        if (this.otherInformation == null) { // if without otherInformation
          this.directory = {
            'category': this.category,
            'directoryName': this.directoryName,
            'address': this.address,
            'contactNumber': this.contactNumber,
            'operatingHours': this.operatingHours,
            'otherInformation': null,
            'deskTMO': this.currentUser
          };


          this.firebaseService.addDirectory(this.directory);
          console.log('Directory added');
          this.thisDialogRef.close('ADD');
        } else { // if with otherInformation
          this.directory = {
            'category': this.category,
            'directoryName': this.directoryName,
            'address': this.address,
            'contactNumber': this.contactNumber,
            'operatingHours': this.operatingHours,
            'otherInformation': this.otherInformation,
            'deskTMO': this.currentUser
          };

          this.firebaseService.addDirectory(this.directory);
          console.log('Directory added');
          this.thisDialogRef.close('ADD');
        }


      } else {
        console.log('Please fill in all required fields.');

      }



    }



    onCancel() {
      this.thisDialogRef.close('Cancel');

    }

}
