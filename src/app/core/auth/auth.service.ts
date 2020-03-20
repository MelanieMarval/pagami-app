import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, mergeMap, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private URL = `${environment.API_URL}/auth`;
    private httpClient: HttpClient;

    constructor(private mainService: MainService) {
        this.httpClient = mainService.httpClient;
    }

    singIn(token: string) {
        const method = 'sign-in';
        const request = this.httpClient.post(`${this.URL}/${method}`, { token },
            {
                headers: this.mainService.getHeaders()
            });
        return this.mainService.serverListener(request);
    }
}
