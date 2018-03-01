import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker, AgmCoreModule } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {} from '@types/googlemaps';




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
   current: any;

   sampleLat = 9.319988799999999 + 0.0001;
   sampleLng = 123.30712629999994 + 0.0001;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('origin')
  public originElementRef: ElementRef;

  @ViewChild('destination')
  public destinationElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private firebaseService: FirebaseService,
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {


    this.current = this.angularFireAuth.auth.currentUser;
    if (this.current == null)
    {
      this.router.navigate(['/']);
    }
    this.mapUpdates = this.firebaseService.getMapUpdates();
    this.ofLocations = this.firebaseService.trackLocation();
    this.mapData = this.firebaseService.getMapUpdates();

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


}


  // getting direction
  public getDirection() {
    this.dir = {
      origin: { lat: this.originLat, lng: this.originLng },
      destination: { lat: this.destinationLat, lng: this.destinationLng }
    };
   // const origin = new google.maps.LatLng(this.originLat, this.originLng);
   // const destination = new google.maps.LatLng(this.destinationLat, this.destinationLng);
    // const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    // console.log(distance);

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

