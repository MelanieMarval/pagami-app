import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private URL = `${environment.API_URL}/config`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    async getPayMethods(id = 'payMethods'): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/payment-methods`, options);
        return this.apiService.serverListener(request);
    }
}
