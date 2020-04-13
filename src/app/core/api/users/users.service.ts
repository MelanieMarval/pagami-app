import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private URL = `${environment.API_URL}/users`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    async getAll(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}`, options);
        return this.apiService.serverListener(request);
    }

    async changeStatus(status: string, id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${id}/status/${status}`, {}, options);
        return this.apiService.serverListener(request);
    }

    async changeType(type: string, id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${id}/type/${type}`, {}, options);
        return this.apiService.serverListener(request);
    }

}
