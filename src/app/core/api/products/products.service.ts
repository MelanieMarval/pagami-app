import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api.response';
import { Product } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private URL = `${environment.API_URL}/products`;
    private httpClient: HttpClient;

    constructor(private apiService: ApiService) {
        this.httpClient = apiService.httpClient;
    }

    /**
     *
     * @param product: product object to make request
     */
    async save(product: Product): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.post(`${this.URL}`, product, options);
        return this.apiService.serverListener(request);
    }

    async update(product: Product, id: string): Promise<ApiResponse> {
        const options: any = await this.apiService.getOptionsHeadersTokenized();
        const request = this.httpClient.put(`${this.URL}/${id}`, product, options);
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
