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
  originAddress: any;
  destinationLat: number;
  destinationLng: number;
  destinationAddress: any;
  dir = undefined;
  distance: any = 0;

   mapUpdate: any;
   mapUpdates: any;
   ofLocation: any;
   ofLocations: any;
   mapData: any;


   notifLat: number;
   notifLng: number;
   current: any;

  now = Date.now();
  duration: any;
  durationMin: any;



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
    this.mapUpdates = this.firebaseService.getMapUpdate();
    this.ofLocations = this.firebaseService.trackLocation();
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
        this.originAddress =  place.formatted_address;
        this.originLat = place.geometry.location.lat();
        this.originLng = place.geometry.location.lng();
        // this.zoom = 17;

      });
    });
  });


   // load places autocomplete
   this.mapsAPILoader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement, restrict
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

        // set latitude, longitude for destination
        this.destinationAddress =  place.formatted_address;
        this.destinationLat = place.geometry.location.lat();
        this.destinationLng = place.geometry.location.lng();
        // this.zoom = 17;

      });
    });
  });

  // getting map updates
  this.firebaseService.getMapUpdates().subscribe(mapUpdate => {
    // console.log(mapUpdate);
    this.mapUpdate = mapUpdate;
   // this.getDuration();
  });

  // tracking locations
  this.firebaseService.trackLocation().subscribe(ofLocation => {
    // console.log(ofLocation);
    this.ofLocation = ofLocation;
  });

}

  public onMouseOver(infoWindow, gm) {

      if (gm.lastOpen != null) {
          gm.lastOpen.close();
      }

      gm.lastOpen = infoWindow;
      infoWindow.open();
  }


  public getDuration() {
    this.duration = this.now - this.mapUpdate.timeUpdated;
    this.durationMin = moment.duration( this.duration, 'milliseconds').asMinutes;
    console.log(this.durationMin);
  }

  // getting direction
  public getDirection() {
    this.dir = {
      origin: { lat: this.originLat, lng: this.originLng },
      destination: { lat: this.destinationLat, lng: this.destinationLng }
    };

    const _eQuatorialEarthRadius = 6378.1370;
    const _d2r = (Math.PI / 180.0);

    const dlong = (this.destinationLng - this.originLng) * _d2r;
    const dlat = (this.destinationLat - this.originLat) * _d2r;
    const a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(this.originLat * _d2r) * Math.cos(this.destinationLat
           * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = _eQuatorialEarthRadius * c;
    console.log(d);
    this.distance = d;

  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

}

