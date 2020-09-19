import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelCallbackService {

  // tslint:disable-next-line:variable-name
  private _callback: {
    url: string,
    txnId: string,
    token: string,
    txnStatus: string,
    employeeId: string,
    responseCode: string,
    responseMsg: string
    templateId: string
    userCode: string
  };

  constructor() {
    this._callback = {
      url: '',
      txnId: '',
      token: '',
      txnStatus: '',
      employeeId: '',
      responseCode: '',
      responseMsg: '',
      templateId: '',
      userCode: ''

    };
  }

  public get callback(): any {
    return this._callback;
  }

  public set callback(callback: any) {
    // console.log('DATA : ', callback);
    this._callback = {
      url: callback.url,
      txnId: callback.txnId,
      token: callback.token,
      txnStatus: callback.txnStatus,
      employeeId: callback.employeeId,
      responseCode: callback.responseCode,
      responseMsg: callback.responseMsg,
      templateId: callback.templateId,
      userCode: callback.userCode
    };
  }
}
