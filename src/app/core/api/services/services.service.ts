import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';
import { Service } from './service';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    private URL = `${environment.API_URL}/services`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    /**
     *
     * @param service: service object to make request
     */
    async save(service: Service): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, service, options);
        return this.apiService.serverListener(request);
    }

    async update(service: Service, id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${id}`, service, options);
        return this.apiService.serverListener(request);
    }

    async getByPlaceId(placeId: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/place/${placeId}`, options);
        return this.apiService.serverListener(request);
    }

    async delete(id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.delete(`${this.URL}/${id}`, options );
        return this.apiService.serverListener(request);
    }


}
