import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from './geolocation/geolocation.service';
import { StorageProvider } from '../providers/storage.provider';
import { ApiService } from './api/api.service';
import { AuthService } from './api/auth/auth.service';
import { PlacesService } from './api/places/places.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { FireStorage } from './fire-storage/fire.storage';
import { PlansService } from './api/plans/plans.service';
import { ClaimService } from './api/claim/claim.service';
import { NotificationsService } from './api/notifications/notifications.service';
import { ProductsService } from './api/products/products.service';
import { CurrenciesService } from './api/currencies/currencies.service';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        Geolocation,
        GeolocationService,
        StorageProvider,
        GoogleAuthService,
        FireStorage,
        ApiService,
        AuthService,
        PlacesService,
        PlansService,
        ClaimService,
        NotificationsService,
        ProductsService,
        CurrenciesService
    ]
})
export class CoreModule {
}
