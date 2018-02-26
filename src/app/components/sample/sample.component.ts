import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  map: any;
  currentLocation: any;
  lat: any;
  lng: any;

  Lat: any[] = [];
  Lng: any[] = [];
  cat: any[] = [];
  info: any[] = [];

  mapData: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private firebaseService: FirebaseService
  ) {
    this.mapData = this.firebaseService.getMapUpdates();

    this.mapData.subscribe(snapshot => {
      this.Lat.length = 0;
      this.Lng.length = 0;
      let x = 0;

      snapshot.forEach(snap => {
        this.Lat[x] = snap.locLat;
        this.Lng[x] = snap.locLng;
        this.cat[x] = snap;
        this.info[x] = snap.notifDetail;
        console.log(this.Lat[x]);
        x++;
      });
    });
  }

  ngOnInit() {

//    this.loadMap();
  }

/*
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
    var LatLng;

      if(this.lat == null) {
        LatLng = new
        google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      } else {
        LatLng = new
        google.maps.LatLng(this.lat, this.lng);
      }

      let mapOptions = {
        center: LatLng,
        zoom: 15
      }

      this.map = new
      google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.currentLocation = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: LatLng
      });
      var eventLocation: any[] = [], iconLink;
      console.log(this.cat.length);
      for(var i = 0; i < this.Lat.length; i++) {
        eventLocation[i] = new google.maps.LatLng(this.Lat[i], this.Lng[i]);
        if(this.cat[i].category == 'Traffic') {
          if(this.cat[i].subcategory == 'Light')
          
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
          else if(this.cat[i].subcategory == 'Moderate')
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          else if(this.cat[i].subcategory == 'Heavy')
            iconLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        this.addMarker(eventLocation[i], this.Lat[i], iconLink);
        console.log("test");
      }
    });
  }
  
  addMarker(eventLocation, Lat, iconLink) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: eventLocation,
      icon: iconLink
    });
  }
}

 */ 

}
