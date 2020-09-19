import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { Constants } from './constants';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  channelId: String = ""
  
  constructor(
    private api: ApiService,
    public constants: Constants
  ) { }

  getCustomerProfile(refCode) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_CUSTOMER_PROFILE;
    const request = { custRef: refCode };
    return this.api.post(url, request).pipe(
      map((res: any) => {
        this.channelId = res.data.callback.channelId
        return res
      }),
      catchError(this.api.handleError)
    );
  }
}
