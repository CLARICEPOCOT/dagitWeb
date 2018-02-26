import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';
import * as moment from 'moment';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public searchControl: FormControl;
  public originControl: FormControl;
  public destinationControl: FormControl;


  public latitude: number;
  public longitude: number;
  public zoom: number;
  public place: any;

  location: any;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
   dir = undefined;

   mapUpdate: any;
   mapUpdates: any;
   ofLocation: any;
   ofLocations: any;
   mapData: any;
   mapLat: any[] = [];
   mapLng: any[] = [];
   mapInfo: any[] = [];
   mapCat: any[] = [];
   mapSubCat: any[] = [];
   mapTimeStamp: any[] = [];

   lightLat: any[] = [];
   lightLng: any[] = [];
   moderateLat: any[] = [];
   moderateLng: any[] = [];
   heavyLat: any[] = [];
   heavyLng: any[] = [];
   moderateTraffic: any[] = [];
   heavyTraffic: any[] = [];

   apLat: any[] = [];
   apLng: any[] = [];
   noLat: any[] = [];
   noLng: any[] = [];


   notifLat: number;
   notifLng: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('origin')
  public originElementRef: ElementRef;

  @ViewChild('destination')
  public destinationElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private firebaseService: FirebaseService
  ) {
    this.mapUpdates = this.firebaseService.getMapUpdates();
    this.ofLocations = this.firebaseService.trackLocation();


    this.mapData = this.firebaseService.getMapUpdates();

        this.mapData.subscribe(snapshot => {
          this.mapLat.length = 0;
          this.mapLng.length = 0;
          let x = 0;

          snapshot.forEach(snap => {
            this.mapLat[x] = snap.locLat;
            this.mapLng[x] = snap.locLng;
            this.mapTimeStamp[x] = snap.timeStamp;
            this.mapInfo[x] = snap.notifDetail;
            this.mapCat[x] = snap.category;
            this.mapSubCat[x] = snap.subcategory;
            x++;
          });
        });
  }

  ngOnInit() {


  // set current position
  this.setCurrentPosition();
  // create search FormControl

   this.searchControl = new FormControl();
   this.originControl = new FormControl();
   this.destinationControl = new FormControl();

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

        // set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 17;

      });
    });
  });


  // directions
   // load places autocomplete
   this.mapsAPILoader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement, restrict);
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

        // set latitude, longitude for origin
        this.originLat = place.geometry.location.lat();
        this.originLng = place.geometry.location.lng();
        // this.zoom = 17;

      });
    });
  });


   // load places autocomplete
   this.mapsAPILoader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement, restrict
   // { types: ['address', 'restaurant', 'establishments', 'food']}
    );
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

        // set latitude, longitude for origin
        this.destinationLat = place.geometry.location.lat();
        this.destinationLng = place.geometry.location.lng();
        // this.zoom = 17;

      });
    });
  });

  // getting map updates
  this.firebaseService.getMapUpdates().subscribe(mapUpdate => {
    console.log(mapUpdate);
    this.mapUpdate = mapUpdate;
  });

  // tracking locations
  this.firebaseService.trackLocation().subscribe(ofLocation => {
    console.log(ofLocation);
    this.ofLocation = ofLocation;
  });

 // categorizing map data
 for ( let i = 0; i < this.mapLat.length; i++ ) {
   // check if to display
   const now = moment().format('MMMM Do YYYY, h:mm:ss a');
   const stamp = moment(this.mapTimeStamp[i]);
  // const duration = moment.duration(now.diff(stamp, 'minutes'));
  // const minutes = duration.asMinutes();
  /*
   if ()
   {

   }*/
   // check category
   if (this.mapSubCat[i] === 'Light') {
      this.lightLat[i] = this.mapLat[i];
      this.lightLng[i] = this.mapLng[i];
   } else if (this.mapSubCat[i] === 'Moderate') {
      this.moderateLat[i] = this.mapLat[i];
      this.moderateLng[i] = this.mapLng[i];
   } else if (this.mapSubCat[i] === 'Heavy') {
     this.heavyLat[i] = this.mapLat[i];
     this.heavyLng[i] = this.mapLng[i];
   }

 }

}


  // getting direction
  public getDirection() {
    this.dir = {
      origin: { lat: this.originLat, lng: this.originLng },
      destination: { lat: this.destinationLat, lng: this.destinationLng }
    };
  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }

/*
  private markerURL() {
    return ('C:\Users\Calypso\CAPSTONE\db service\dagit\src\assets\heavy.png');
  }*/
/*
    this.location = {
      'coordinates': {
         'lat': this.latitude,
        'lng': this.longitude}
    };

    this.firebaseService.addMapLocations(this.location);
*/
  }

  getTMOLocation () {
    // insert codes from the other proj
  }


  getParking () {
    // insert codes from the other proj
  }


  getTraffic () {
    // insert codes from the other proj
  }

  login() {
   // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
   // this.afAuth.auth.signOut();
  }


}

