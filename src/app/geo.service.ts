import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from 'geofire';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeoService {

  dbRef: any;
  geoFire: any;
  hits = new BehaviorSubject([]);

  constructor(private dagit: AngularFireDatabase) {
    /// Reference database location for GeoFire
    this.dbRef = this.dagit.list('/locations');
    this.geoFire = new GeoFire(this.dbRef.$ref);
  }


   /// Queries database for nearby locations
   /// Maps results to the hits BehaviorSubject
   getLocations(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
      const hit = {
        location: location,
        distance: distance
      };
      const currentHits = this.hits.value;
      currentHits.push(hit);
      this.hits.next(currentHits);
    });
   }



}
