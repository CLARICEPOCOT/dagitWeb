import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  public originControl: FormControl;
  public destinationControl: FormControl;
  latitude: number;
  longitude: number;
  lat: Number;
  lng: Number;
  zoom: Number;

  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
   dir = undefined;
   public place: any;

   @ViewChild('origin')
   public originElementRef: ElementRef;

   @ViewChild('destination')
   public destinationElementRef: ElementRef;


   constructor(
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
     private firebaseService: FirebaseService
   ) {

   }

  ngOnInit() {

   // create search FormControl
   this.originControl = new FormControl();
   this.destinationControl = new FormControl();


    // load places autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement, {
       // types: ['address', 'restaurant', 'establishments', 'food']

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

          // set latitude, longitude for origin
          this.originLat = place.geometry.location.lat();
          this.originLng = place.geometry.location.lng();
          // this.zoom = 17;

        });
      });
    });


     // load places autocomplete
     this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement, {
       // types: ['address', 'restaurant', 'establishments', 'food']

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

          // set latitude, longitude for origin
          this.destinationLat = place.geometry.location.lat();
          this.destinationLng = place.geometry.location.lng();
          // this.zoom = 17;

        });
      });
    });

  }


  public getDirection() {
    this.dir = {
      origin: { lat: this.originLat, lng: this.originLng },
      destination: { lat: this.destinationLat, lng: this.destinationLng }
    };
  }

}
