import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FireStorage {

    constructor(private storageFire: AngularFireStorage) {
    }

    saveProfileImage(image) {
        return this.uploadImage(image, 'profile');
    }

    saveBusinessImage(image) {
        return this.uploadImage(image, 'place');
    }

    private uploadImage(image, folder: string): Promise<string> {
        return new Promise(resolve => {
            try {
                const randomId = Math.random().toString(36).substring(2);
                const url = `/images/${folder}/${randomId}`;
                const ref = this.storageFire.ref(url);
                const task = this.storageFire.upload(url, image);
                task.snapshotChanges().pipe(
                    finalize(() => {
                        ref.getDownloadURL().subscribe(next => {
                            resolve(next);
                        }, error => {
                            resolve(undefined);
                            console.log(error);
                        });
                    })
                ).subscribe();
            } catch (e) {
                resolve(undefined);
                console.log(e);
            }
        });
    }

}
