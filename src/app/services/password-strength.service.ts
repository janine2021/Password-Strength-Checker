import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Password } from '../models/password-strength.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PasswordStrengthService {

    apiUrl: string = 'https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    // Get the password's strength
    getPasswordStrength(password: Password): Observable<any> {

        let API_URL = `${this.apiUrl}/strength`;
        if (password === { password: '' }) {
            return of([]);
        }
        return this.http.post(API_URL, password)
            .pipe(
                catchError(this.error)
            )
    }

    // Handle errors 
    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}