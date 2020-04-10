import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Place } from './place';
import { ApiResponse } from '../api.response';
import { PLACES } from '../../../utils/Const';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    private URL = `${environment.API_URL}/places`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    async getAll(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}`, options);
        return this.apiService.serverListener(request);
    }

    async getAllWaiting(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/status/${PLACES.STATUS.WAITING}`, options);
        return this.apiService.serverListener(request);
    }

    async getAllAvailable(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/all-available`, options);
        return this.apiService.serverListener(request);
    }

    async findById(id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/${id}`, options);
        return this.apiService.serverListener(request);
    }

    async myRegisters(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/by-registered`, options);
        return this.apiService.serverListener(request);
    }

    async save(place: Place): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, place, options);
        return this.apiService.serverListener(request);
    }

    async update(place: Place): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}`, place, options);
        return this.apiService.serverListener(request);
    }

    async changeStatus(id: string, status: string, reason?: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${id}/status/${status}`, {reason}, options);
        return this.apiService.serverListener(request);
    }

    async delete(id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.delete(`${this.URL}/${id}`, options);
        return this.apiService.serverListener(request);
    }

    async getNearby(lat: number, lng: number): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        options.params = new HttpParams().set('latitude', String(lat)).set('longitude', String(lng));
        const request = this.httpClient.get(`${this.URL}/nearby/search`, options);
        return this.apiService.serverListener(request);
    }

    async getPlaceByGeocode(lat: number, lng: number): Promise<any> {
        // tslint:disable-next-line:max-line-length
        const request = this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s`);
        return request.toPromise();
    }
}
