import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, mergeMap, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(public httpClient: HttpClient) {}

    /**
     * Request to firebase functions
     */
    serverListener(request: Observable<any>) {
        return request.pipe(
            timeout(environment.TIMEOUT),
            catchError(this.handleError),
            mergeMap(res => {
                return this.handlerResponse(res);
            }),
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
        return header;
    }
}