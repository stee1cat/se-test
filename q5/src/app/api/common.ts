import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(response: HttpErrorResponse) {
  if (response.error instanceof ErrorEvent) {
    console.error('An error occurred:', response.error.message);
  } else {
    const { status, error } = response;

    console.error(`Backend returned code ${status}, body was: ${error}`);
  }

  return throwError('Something bad happened; please try again later.');
}