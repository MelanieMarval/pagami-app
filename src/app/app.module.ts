import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PipesModule } from './pipes/pipes.module';
import { firebaseConfig } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
import { OrdersPage } from './pages/orders/orders';
// Providers
import { MapProvider } from './providers/map.provider';
import { UserIntentProvider } from './providers/user-intent.provider';
import { ToastProvider } from './providers/toast.provider';
import { AdminIntentProvider } from './providers/admin-intent.provider';
import { BrowserProvider } from './providers/browser.provider';
import { CompressImageProvider } from './providers/compress-image.provider';
import { NotificationsProvider } from './providers/notifications.provider';

@NgModule({
    declarations: [AppComponent, OrdersPage],
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
        CoreModule,
        PipesModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        MapProvider,
        ToastProvider,
        UserIntentProvider,
        AdminIntentProvider,
        BrowserProvider,
        NotificationsProvider,
        CompressImageProvider,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
