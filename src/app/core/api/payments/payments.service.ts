import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';
import { PAYMENTS } from '../../../utils/Const';
import { Payment } from './Payment';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    private URL = `${environment.API_URL}/payments`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    /**
     *
     * @param payment: payment object to make request
     */
    async save(payment: Payment): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, payment, options);
        return this.apiService.serverListener(request);
    }

    /**
     *
     * @param paymentId: id of the claim request
     * @param status: new status, can be PAYMENT.STATUS.REJECTED or PAYMENT.STATUS.ACCEPTED, remember use 'Const'
     */
    async changeStatus(paymentId: string, status: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${paymentId}/status/${status}`, {}, options);
        return this.apiService.serverListener(request);
    }

    async getPendingById(placeId: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/${PAYMENTS.STATUS.PENDING}/place/${placeId}`, options);
        return this.apiService.serverListener(request);
    }

    async getPending(): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/status/${PAYMENTS.STATUS.PENDING}`, options);
        return this.apiService.serverListener(request);
    }

    async findById(id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.get(`${this.URL}/${id}`, options);
        return this.apiService.serverListener(request);
    }
}
