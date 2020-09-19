import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';


@Injectable({
  providedIn: 'root'
})
export class OpenAccountService {

  // tslint:disable-next-line:variable-name
  private _openAccountInfo: any;

  // tslint:disable-next-line:variable-name
  private _transId: string;

  // tslint:disable-next-line:variable-name
  private _openAccountVerify: {
    referenceId: string,
    custAuthenStatus: string
  };

  // tslint:disable-next-line:variable-name
  private _openAccountSummary: {
    customerInfo: {
      name: string,
      idCard: string,
      address: string,
      email: string,
      mobile: string,
      addressSeq: string,
      emailSeq: string,
      mobileSeq: string,
      customerNumber: string
    },
    accountInfo: {
      accountNo: string,
      accountNameTH: string,
      accountNameEN: string,
      accountProduct: string,
      accountStatement: string,
      purpose: string,
      openAccountStatus: string
    },
    subscriptionInfo: {
      productName: string,
      email: string,
      mobile: string,
      internetBanking: string
    }
    signature: {
      custSign: string
    }
  };

  constructor(
    private api: ApiService,
    public constants: Constants,
    private channelCallbackService: ChannelCallbackService
  ) {
    this._openAccountVerify = {
      referenceId: '',
      custAuthenStatus: ''
    };

    this._openAccountSummary = {
      customerInfo: {
        name: '',
        idCard: '',
        address: '',
        email: '',
        mobile: '',
        addressSeq: '',
        emailSeq: '',
        mobileSeq: '',
        customerNumber: ''
      },
      accountInfo: {
        accountNo: '',
        accountNameTH: '',
        accountNameEN: '',
        accountProduct: '',
        accountStatement: '',
        purpose: '',
        openAccountStatus: ''
      },
      subscriptionInfo: {
        productName: '',
        email: '',
        mobile: '',
        internetBanking: ''
      },
      signature: {
        custSign: ''
      }
    };
  }

  public get openAccountInfo(): any {
    return this._openAccountInfo;
  }
  public set openAccountInfo(data: any) {
    this._openAccountInfo = data;
  }

  public get transId(): string {
    return this._transId;
  }
  public set transId(transId: string) {
    this._transId = transId;
  }

  public get openAccountVerify(): any {
    return this._openAccountVerify;
  }
  public set openAccountVerify(openAccountVerify: any) {
    this._openAccountVerify = {
      referenceId: openAccountVerify.referenceId,
      custAuthenStatus: openAccountVerify.custAuthenStatus
    };
  }

  public get openAccountSummary(): any {
    return this._openAccountSummary;
  }
  public set openAccountSummary(openAccountSummary: any) {
    this._openAccountSummary = {
      customerInfo: {
        name: openAccountSummary.customerInfo.name,
        idCard: openAccountSummary.customerInfo.idCard,
        address: openAccountSummary.customerInfo.address,
        email: openAccountSummary.customerInfo.email,
        mobile: openAccountSummary.customerInfo.mobile,
        addressSeq: openAccountSummary.customerInfo.addressSeq,
        emailSeq: openAccountSummary.customerInfo.emailSeq,
        mobileSeq: openAccountSummary.customerInfo.mobileSeq,
        customerNumber: openAccountSummary.customerInfo.customerNumber
      },
      accountInfo: {
        accountNo: openAccountSummary.accountInfo.accountNo,
        accountNameTH: openAccountSummary.accountInfo.accountNameTH,
        accountNameEN: openAccountSummary.accountInfo.accountNameEN,
        accountProduct: openAccountSummary.accountInfo.accountProduct,
        accountStatement: openAccountSummary.accountInfo.accountStatement,
        purpose: openAccountSummary.accountInfo.purpose,
        openAccountStatus: openAccountSummary.accountInfo.openAccountStatus
      },
      subscriptionInfo: {
        productName: openAccountSummary.subscriptionInfo.productName,
        email: openAccountSummary.subscriptionInfo.email,
        mobile: openAccountSummary.subscriptionInfo.mobile,
        internetBanking: openAccountSummary.subscriptionInfo.internetBanking
      },
      signature: {
        custSign: openAccountSummary.signature.custSign
      }
    };
  }

  public submitOpenAccount(req) {
    // console.log('REQ', req)
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.SUBMIT_OPEN_ACCOUNT;
    return this.api.post(url, req).pipe(
      map((res: any) => res)
    );
  }

  public approveOpenAccount(req) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.APPROVE_OPEN_ACCOUNT;
    return this.api.post(url, req).pipe(
      map((res: any) => res)
    );
  }

  public retriveOpenAccountVerify(transactionId) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.RETRIVE_STATUS_OPEN_ACCOUNT;
    const request = {
      transId: transactionId
    };
    return this.api.post(url, request).pipe(
      map((res: any) => res)
    );
  }
  public getResponseCallBack(param) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ERR_REQ_REDIRECE;
    return this.api.post(url, param).pipe(
      map((res: any) => res)
    );
  }

  public getOpenAccountReport(param) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_OPEN_ACCOUNT_REPROT;
    const request = { transId: param };
    return this.api.post(url, request).pipe(
      map((res: any) => res)
    );
  }

  public testIdpass() {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.INTERNAL_OPEN_APP_FORM;
    const request = {
      token: '0310910B30400E60740940620670B40C20110710670F30CD',
      employeeId: '100092',
      cifNo: '3099000560',
      templateId: 'ACT001',
      callBackURL: 'https://cdf_dev.kiatnakinbank.com/CDFWeb/CallBack/resultCallBack',
      custType: 'E',
      addressSeq: '3',
      emailSeq: '2',
      mobileSeq: '1',
      userCode: 'kk003s001'
    };
    return this.api.postHeader(url, request).pipe(
      map((res: any) => res)
    );
  }


  public getIntenalOpenAppForm(referenceId: string, dataSummaty: any) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.INTERNAL_OPEN_APP_FORM;
    const request = {
      addressSeq: dataSummaty.customerInfo.addressSeq,
      callBackURL: this.channelCallbackService.callback.url,
      cifNo: dataSummaty.customerInfo.customerNumber,
      custType: 'E',
      emailSeq: dataSummaty.customerInfo.emailSeq,
      employeeId: this.channelCallbackService.callback.employeeId,
      mobileSeq: dataSummaty.customerInfo.mobileSeq,
      templateId: this.channelCallbackService.callback.templateId,
      token: this.channelCallbackService.callback.token,
      userCode: this.channelCallbackService.callback.userCode
    };
    return this.api.postHeader(url, request).pipe(map((res: any) => res)
    );
  }

  public resendRPRequest(TRANS_ID) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.RESEND_RP_REQUEST;
    const request = { transId: TRANS_ID };
    return this.api.post(url, request).pipe(
      map((res: any) => res)
    );
  }
}
