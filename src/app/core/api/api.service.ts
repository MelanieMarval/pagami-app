import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GoogleAuthService } from '../google-auth/google-auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        public httpClient: HttpClient,
        private googleAuthService: GoogleAuthService) {}

    /**
     * Request to firebase functions
     */
    serverListener(request: Observable<any>) {
        return request.pipe(
            // timeout(environment.TIMEOUT),
            // catchError(this.handleError),
            // mergeMap(res => {
            //     return this.handlerResponse(res);
            // }),
        ).toPromise();
    }

    handlerResponse(response: any): Observable<any> {
        return new Observable(observer => {
            observer.next(response);
            observer.complete();
        });
    }

    handleError(error): Observable<any> {
        const errorMessage = error.message;
        return throwError({
            message: errorMessage,
            withStatus200: false,
            num: 0
        });
    }

    getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        header = header.append('content-type', 'application/json; charset=utf-8');
        header = header.append('authorization', 'application/json; charset=utf-8');
        return header;
    }

    async getOptionsHeadersTokenized(): Promise<any> {
        return new Promise(async resolve => {
            const token = await this.googleAuthService.getToken();
            let header = new HttpHeaders();
            header = header.append('content-type', 'application/json; charset=utf-8');
            header = header.append('authorization', token);
            resolve({ headers: header });
        });
    }
}
