import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
    providedIn: 'root'
})
export class RequestAndroidPermissionsService {

    constructor(private androidPermissions: AndroidPermissions) {
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
}
