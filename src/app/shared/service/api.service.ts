import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { Constants } from './constants';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    public constants: Constants,
    private channelCallbackService: ChannelCallbackService
  ) { }

  post(url: string, request: any) {
    const httpOptions = this.generateHeader();
    return this.http.post(url, JSON.stringify(request), httpOptions);
  }

  private generateHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        charset: 'utf-8',
        ReferenceNo: UUID.UUID(),
        SystemCode: this.constants.SYSTEM_CODE,
        ChannelId: this.constants.CHANNEL_ID
      })
    };
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('An error occurred; please try again later.');
  }

  postHeader(url: string, request: any) {
    const httpOptions = this.setHeader();
    return this.http.post(url, JSON.stringify(request), httpOptions);
  }

  private setHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        charset: 'utf-8',
        ReferenceNo: this.channelCallbackService.callback.txnId,
        SystemCode: this.constants.SYSTEM_CODE_IDPASS,
        ChannelId: this.constants.CHANNEL_ID_IDPASS
      }),
    };
  }
}
