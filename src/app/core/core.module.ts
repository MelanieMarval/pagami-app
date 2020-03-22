import { NgModule } from '@angular/core';
import { AuthService } from './api/auth/auth.service';
import { ApiService } from './api/api.service';
import { PlacesService } from './api/places/places.service';
import { StorageService } from './storage/storage.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleAuthService } from './google-auth/google-auth.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        Geolocation,
        ApiService,
        AuthService,
        PlacesService,
        StorageService,
        GeolocationService,
        GoogleAuthService
    ]
})
export class CoreModule { }
