import {Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { User } from '../users/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private URL = `${environment.API_URL}/auth`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    async singIn() {
        const method = 'sign-in';
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}/${method}`, { }, options);
        return this.apiService.serverListener(request);
    }

    async create(user: User) {
        const method = 'create/user';
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}/${method}`, user, options);
        return this.apiService.serverListener(request);
    }

    async update(user: User) {
        const method = 'update/user';
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}/${method}`, user, options);
        return this.apiService.serverListener(request);
    }

    async verify() {
        const method = 'verify/user';
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/${method}`, options);
        return this.apiService.serverListener(request);
    }

    async delete() {
        const method = 'delete/user';
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.delete(`${this.URL}/${method}`, options);
        return this.apiService.serverListener(request);
    }
}
