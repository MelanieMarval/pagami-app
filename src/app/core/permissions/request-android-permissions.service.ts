import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
    providedIn: 'root'
})
export class RequestAndroidPermissionsService {

    constructor(private androidPermissions: AndroidPermissions,
                private locationAccuracy: LocationAccuracy) {
    }

    // PERMISSION LOCATION PRECISE
    accessLocation(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                async result => {
                    if (result.hasPermission) {
                        resolve(true);
                    } else {
                        resolve(await this.requestAccessLocation());
                    }
                },
                async error => {
                    console.log('-> error: ', error);
                    resolve(await this.requestAccessLocation());
                },
            );
        });
    }

    private requestAccessLocation(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                .then(result => result.hasPermission ? resolve(true) : resolve(false),
                    error => {
                        console.log('error permiso requestAccessLocation', error);
                        resolve(false);
                    },
                );
        });
    }


    // GPS ACTIVE
    checkActiveGPS(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.locationAccuracy.canRequest()
                .then(result => {
                        if (result) {
                            this.locationAccuracy.isRequesting().then(
                                async res => {
                                    if (res) {
                                        resolve(true);
                                        console.log('-> you have a previous request active', res);
                                    } else {
                                        const response = await this.requestActiveGPS();
                                        resolve(response);
                                    }
                                });
                        } else {
                            resolve(false);
                        }
                    }, error => {
                        console.log('acurracy error', error);
                        resolve(false);
                    },
                );
        });
    }

    private requestActiveGPS(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
                .then((res) => {
                    if (res.code === this.locationAccuracy.SUCCESS_USER_AGREED || res.code === 0) {
                        resolve(true);
                    }
                }, error => {
                    console.log(error);
                    if (error.code === this.locationAccuracy.ERROR_USER_DISAGREED) {
                        resolve(false);
                    }
                });
        });
    }

}
