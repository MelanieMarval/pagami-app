import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../api/users/user';

const IS_LOGGED = 'is_logged';
const SESSION_TOKEN = 'session_token';
const PAGAMI_USER = 'pagami_user';
const GOOGLE_USER = 'google_user';
const USER_UNREGISTERED = 'user_unregistered';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) {
    }

    isLogged(): Promise<boolean> {
        return new Promise(resolve => {
            this.storage.get(IS_LOGGED)
                .then(
                    data => resolve(data),
                    () => resolve(false)
                );
        });
    }

    setLogged(isLogged: boolean): Promise<any> {
        return this.storage.set(IS_LOGGED, isLogged);
    }

    setToken(token: string): Promise<any> {
        return this.storage.set(SESSION_TOKEN, token);
    }

    getToken(): Promise<string> {
        return new Promise(resolve => {
            this.storage.get(SESSION_TOKEN)
                .then(
                    data => resolve(data),
                    () => resolve('')
                );
        });
    }

    setPagamiUser(user: User): Promise<any> {
        return this.storage.set(PAGAMI_USER, user);
    }

    getPagamiUser(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get(PAGAMI_USER)
                .then(
                    data => resolve(data),
                    () => resolve(undefined)
                );
        });
    }

    setUserUnregistered(user: any): Promise<any> {
        return this.storage.set(USER_UNREGISTERED, user);
    }

    getUserUnregistered(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get(USER_UNREGISTERED)
                .then(
                    data => resolve(data),
                    () => resolve(undefined)
                );
        });
    }

    setGoogleUser(user: any): Promise<any> {
        return this.storage.set(GOOGLE_USER, user);
    }

    getGoogleUser(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get(GOOGLE_USER)
                .then(
                    data => resolve(data),
                    () => resolve(undefined)
                );
        });
    }

}
