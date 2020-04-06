import {Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Place } from './place';
import { ApiResponse } from '../api.response';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    private URL = `${environment.API_URL}/places`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    async getAll() {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}`, options);
        return this.apiService.serverListener(request);
    }

    async findById(id: string) {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/${id}`, options);
        return this.apiService.serverListener(request);
    }

    async myRegisters() {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/by-registered`, options);
        return this.apiService.serverListener(request);
    }

    async save(place: Place) {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, place, options);
        return this.apiService.serverListener(request);
    }

    async update(place: Place) {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}`, place, options);
        return this.apiService.serverListener(request);
    }

    async delete(id: string) {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.delete(`${this.URL}/${id}`, options);
        return this.apiService.serverListener(request);
    }

    async getNearby(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/nearby/search`, options);
        return this.apiService.serverListener(request);
    }
}
