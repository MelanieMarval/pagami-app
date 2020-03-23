import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { BusinessDetailsPage } from './pages/details-business/business-details';
import { SelectIconPage } from './pages/details-business/select-icon/select-icon';
import { OrdersPage } from './pages/orders/orders';
import { AppService } from './services/app.service';

import { CoreModule } from './core/core.module';
import { PagamiToast } from './toast/pagami.toast';

import { firebaseConfig } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
    declarations: [AppComponent, OrdersPage, BusinessDetailsPage, SelectIconPage],
    entryComponents: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        IonicStorageModule.forRoot(),
        CoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppService,
        PagamiToast,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
