import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endPoint = 'products/';
  httpHeader = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    })
  };
  constructor(private httpClient: HttpClient) {
  }
  getProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.url}${this.endPoint}`, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  getProductById(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.url}${this.endPoint}${id}`, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  postProduct(params): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}${this.endPoint}`, params, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  updateProduct(id, params): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}${this.endPoint}${id}`, params, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  deleteProduct(id): Observable<any> {
    return this.httpClient.delete<any>(`${environment.url}${this.endPoint}${id}`, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  httpError(error) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
