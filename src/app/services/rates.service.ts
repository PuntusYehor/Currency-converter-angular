import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';
import { IRate } from '../models/rates';
import { ErrorService } from './error.service';

@Injectable({providedIn: 'root'})

export class RatesService {
  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.errorHandler = this.errorHandler.bind(this)
  }

  getAll(): Observable<IRate[]> {
    return this.http.get<IRate[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").pipe(
      catchError(this.errorHandler),
      retry(3)
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => new Error(error.message))
  }
}
