import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';

// imports for materialize
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

// imports for animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports for angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatSnackBar } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';


// imports for database
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
// import { AngularFireAuthModule, AngularFireAuthProvider, AUTH_PROVIDERS } from 'angularfire2/auth';
// import { environment } from '../environments/environment';


// imports for maps
import { environment } from './../environments/environment';
import { AgmCoreModule } from '@agm/core';


// dagit modules
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { ManageAccountsComponent } from './components/manage-accounts/manage-accounts.component';
import { HelpdeskComponent } from './components/helpdesk/helpdesk.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AccidentReportsComponent } from './components/accident-reports/accident-reports.component';
import { ViolationReportsComponent } from './components/violation-reports/violation-reports.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AddDirectoryComponent } from './components/add-directory/add-directory.component';
import { PublishAnnouncementComponent } from './components/publish-announcement/publish-announcement.component';
import { PublishTrafficComponent } from './components/publish-traffic/publish-traffic.component';
import { PublishParkingComponent } from './components/publish-parking/publish-parking.component';
import { EditDirectoryComponent } from './components/edit-directory/edit-directory.component';
import { AddDeskTmoComponent } from './components/add-desk-tmo/add-desk-tmo.component';
import { AddOnfieldComponent } from './components/add-onfield/add-onfield.component';
import { AddNotificationComponent } from './components/add-notification/add-notification.component';
import { SearchDirectoryComponent } from './components/search-directory/search-directory.component';
import { SearchAccountsComponent } from './components/search-accounts/search-accounts.component';
import { SearchNotificationsComponent } from './components/search-notifications/search-notifications.component';
import { EditOnFieldComponent } from './components/edit-on-field/edit-on-field.component';
import { EditDeskComponent } from './components/edit-desk/edit-desk.component';
<<<<<<< HEAD
import { GeoService } from './geo.service';
import { InformationComponent } from './components/information/information.component';
import { AddInformationComponent } from './components/add-information/add-information.component';
import { EditInformationComponent } from './components/edit-information/edit-information.component';
=======
import { AddTrafficComponent } from './components/add-traffic/add-traffic.component';
import { AddParkingComponent } from './components/add-parking/add-parking.component';
>>>>>>> master



export const firebaseConfig = {
  apiKey: 'AIzaSyDPsMJ-x7W6_U_k3JsNwMNkxL38e8NkQDI',
  authDomain: 'dagit-7cbac.firebaseapp.com',
  databaseURL: 'https://dagit-7cbac.firebaseio.com',
  projectId: 'dagit-7cbac',
  storageBucket: 'dagit-7cbac.appspot.com',
  messagingSenderId: '902262473533'
};


// app routing
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'accident-reports', component: AccidentReportsComponent},
  {path: 'violation-reports', component: ViolationReportsComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: 'helpdesk', component: HelpdeskComponent},
  {path: 'map', component: MapComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'manage-accounts', component: ManageAccountsComponent},
  {path: 'map', component: MapComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'add-onfield', component: AddOnfieldComponent},
  {path: 'add-desk-tmo', component: AddDeskTmoComponent},
  {path: 'add-directory', component: AddDirectoryComponent},
  {path: 'publish-announcement', component: PublishAnnouncementComponent},
  {path: 'publish-parking', component: PublishParkingComponent},
  {path: 'publish-traffic', component: PublishTrafficComponent},
  {path: 'information', component: InformationComponent},
  {path: 'add-information', component: AddInformationComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MapComponent,
    DirectoryComponent,
    ManageAccountsComponent,
    HelpdeskComponent,
    LogoutComponent,
    MessagesComponent,
    AccidentReportsComponent,
    ViolationReportsComponent,
    NotificationsComponent,
    AddDirectoryComponent,
    PublishAnnouncementComponent,
    PublishTrafficComponent,
    PublishParkingComponent,
    EditDirectoryComponent,
    AddDeskTmoComponent,
    AddOnfieldComponent,
    AddNotificationComponent,
    SearchDirectoryComponent,
    SearchAccountsComponent,
    SearchNotificationsComponent,
    EditOnFieldComponent,
    EditDeskComponent,
<<<<<<< HEAD
    InformationComponent,
    AddInformationComponent,
    EditInformationComponent
=======
    AddTrafficComponent,
    AddParkingComponent
>>>>>>> master
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
<<<<<<< HEAD
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places']
    })
=======
    MatRadioModule
>>>>>>> master
  ],
  entryComponents: [
    AddDirectoryComponent,
    AddDeskTmoComponent,
    AddOnfieldComponent,
    AddNotificationComponent,
    SearchDirectoryComponent,
    SearchAccountsComponent,
    SearchNotificationsComponent,
    EditDirectoryComponent,
    EditDeskComponent,
    EditOnFieldComponent,
<<<<<<< HEAD
    AddInformationComponent
=======
    AddTrafficComponent,
    AddParkingComponent,
>>>>>>> master
  ],
  providers: [FirebaseService, GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
