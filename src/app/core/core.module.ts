import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from './geolocation/geolocation.service';
import { StorageService } from './storage/storage.service';
import { ApiService } from './api/api.service';
import { AuthService } from './api/auth/auth.service';
import { PlacesService } from './api/places/places.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { FireStorage } from './fire-storage/fire.storage';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        Geolocation,
        GeolocationService,
        StorageService,
        ApiService,
        AuthService,
        PlacesService,
        GoogleAuthService,
        FireStorage
    ]
})
export class CoreModule {
}
