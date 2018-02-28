import { Component, OnInit, Inject  } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ManageAccountsComponent } from '../manage-accounts/manage-accounts.component';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public place: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  location: any; // searched location

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private firebaseService: FirebaseService,
    public thisDialogRef: MatDialogRef<ManageAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit() {
    this.searchControl = new FormControl();

    const restrict = {
      componentRestrictions: {country: 'phl'}
    };
  
  
     // load places autocomplete
     this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, restrict);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
  
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            this.place = place;
            return;
          }

          this.location = place.formatted_address;
  
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 17;
  
        });
      });
    });
  }


  onCancel() {
    this.thisDialogRef.close('Cancel');

  }

}
