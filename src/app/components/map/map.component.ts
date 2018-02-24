import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public place: any;
  
  location: any;


  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private firebaseService: FirebaseService
  ) {

  }

  ngOnInit() {


   // create search FormControl
   this.searchControl = new FormControl();

  // set current position
  this.setCurrentPosition();

   // load places autocomplete
   this.mapsAPILoader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
     // types: ['address', 'restaurant', 'establishments', 'food']
 
    });
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

