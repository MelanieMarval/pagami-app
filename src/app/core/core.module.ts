import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MainService } from './main/main.service';
import { PlacesService } from './places/places.service';
import { StorageService } from './storage/storage.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        Geolocation,
        MainService,
        AuthService,
        PlacesService,
        StorageService,
        GeolocationService
    ]
})
export class CoreModule { }
