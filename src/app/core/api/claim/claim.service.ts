import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';

@Injectable({
    providedIn: 'root'
})
export class ClaimService {

    private URL = `${environment.API_URL}/claims`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }
    async claimBusiness(claim): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, claim, options);
        return this.apiService.serverListener(request);
    }

    async getMyBusiness(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/my-business`, options);
        return this.apiService.serverListener(request);
    }

}
