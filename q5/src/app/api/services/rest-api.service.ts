import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';

import { ApiModule } from '../api.module';
import { handleError } from '../common';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: ApiModule
})
export class RestApiService {
  protected endpoint = 'https://jsonplaceholder.typicode.com/photos';

  constructor(protected http: HttpClient) { }

  public photos(start: any = 0, limit: any = 9): Observable<any> {
    const params = new HttpParams()
      .set('_start', start)
      .set('_limit', limit);

    return this.http.get<any>(this.endpoint, {
        observe: 'response',
        params
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          return {
            total: response.headers.get('x-total-count'),
            data: response.body
          };
        }),
        catchError(handleError)
      );
  }
}