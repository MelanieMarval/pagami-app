import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../users/user';

const IS_LOGGED = 'is_logged';
const SESSION_TOKEN = 'session_token';
const USER = 'user';
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

    seUser(user: User): Promise<any> {
        return this.storage.set(USER, user);
    }

    getUser(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get(USER)
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

}
