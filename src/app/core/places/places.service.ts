import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, mergeMap, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { Place } from './place';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    private URL = `${environment.API_URL}/places`;
    private httpClient: HttpClient;

    constructor(private mainService: MainService) {
        this.httpClient = mainService.httpClient;
    }

    getAll() {
        const request = this.httpClient.get(`${this.URL}`,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    findById(id: string) {
        const request = this.httpClient.get(`${this.URL}/${id}`,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    save(place: Place) {
        const request = this.httpClient.post(`${this.URL}`, place,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    saveList(places: Place[]) {
        const request = this.httpClient.post(`${this.URL}/save-all`, places,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    update(place: Place) {
        const request = this.httpClient.put(`${this.URL}`, place,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }

    delete(id: string) {
        const request = this.httpClient.delete(`${this.URL}/${id}`,
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }
}
