import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';
import { CLAIMS } from '../../../utils/Const';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private URL = `${environment.API_URL}/notifications`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    /**
     * this method get all user notifications unread
     */
    async getNotifications(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}`, options);
        return this.apiService.serverListener(request);
    }

    /**
     * this method put all notifications from places accepted and rejected to unread
     */
    async putReadAllAcceptedAndRejected(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/read/all-accepted-rejected`, {}, options);
        return this.apiService.serverListener(request);
    }

}
