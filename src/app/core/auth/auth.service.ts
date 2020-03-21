import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { User } from '../users/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private URL = `${environment.API_URL}/auth`;
    private httpClient: HttpClient;

    constructor(private mainService: MainService) {
        this.httpClient = mainService.httpClient;
    }

    async singIn(token: string) {
        const method = 'sign-in';
        const request = this.httpClient.post(`${this.URL}/${method}`, { token },
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    async create(user: User) {
        const method = 'create/user';
        const options: any = await this.mainService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}/${method}`, user, options);
        return this.mainService.serverListener(request);
    }

    async update(user: User) {
        const method = 'update/user';
        const options: any = await this.mainService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}/${method}`, user, options);
        return this.mainService.serverListener(request);
    }
}
