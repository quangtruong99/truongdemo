import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as config } from '../../../environments/environment';
@Injectable()
export class BaseService {
  OBJECT_ERROR = {
    code: 400,
    message: 'Please check your internet connection and try again',
  };
  constructor(protected http: HttpClient) {}

  private getUrlApi() {
    return config.host;
  }

  protected getData(path?: string): Observable<any> {
    const options = this.getHeaders();
    return this.http.get(`${this.getUrlApi()}/${path}`, options).pipe(
      map(res => {
        return res;
      }),
      catchError(err => this.getError(err))
    );
  }

  protected postData(
    path?: string,
    body?: any,
    headersPairs?: any
  ): Observable<any> {
    const options = this.getHeaders(headersPairs);
    return this.http.post(`${this.getUrlApi()}/${path}`, body, options).pipe(
      map(res => {
        return res;
      }),
      catchError(err => this.getError(err))
    );
  }

  protected putData(
    path?: string,
    body?: any,
    headersPairs?: any
  ): Observable<any> {
    const options = this.getHeaders(headersPairs);
    return this.http.put(`${this.getUrlApi()}/${path}`, body, options).pipe(
      map(res => {
        return res;
      }),
      catchError(err => this.getError(err))
    );
  }

  protected delete(path?: string, headersPairs?: any) {
    const options = this.getHeaders(headersPairs);
    return this.http.delete(`${this.getUrlApi()}/${path}`, options).pipe(
      map(res => {
        return res;
      }),
      catchError(err => this.getError(err))
    );
  }

  getError(err?: any) {
    console.log(err);

    if (err.error.code === 102 || err.error.code === 107) {
      localStorage.removeItem('token');
      setTimeout(() => {
        location.replace('');
      }, 500);
    }
    return throwError({ http_status: err.status, errors: err.error });
  }

  private getHeaders(headersPairs?: any) {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    if (localStorage.getItem('token')) {
      const token: string | any = localStorage.getItem('token');
      httpOptions.headers = httpOptions.headers.set('token', token);
    }

    if (sessionStorage.getItem('token')) {
      const token: string | any = sessionStorage.getItem('token');
      httpOptions.headers = httpOptions.headers.set('token', token);
    }
    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );

    if (headersPairs) {
      headersPairs.forEach((element: any) => {
        httpOptions.headers = httpOptions.headers.set(
          element.key,
          element.value
        );
      });
    }
    return httpOptions;
  }
}
