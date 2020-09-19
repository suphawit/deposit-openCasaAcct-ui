import { Injectable } from '@angular/core';
import { ChannelCallbackService } from './channel-callback.service';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private channelCallbackService: ChannelCallbackService,
    private constants: Constants
  ) { }

  public transformCommonDDL(val: any, viewVal: any) {
    return Object.assign({}, {
      value: val,
      viewValue: viewVal
    });
  }

  public appendDefaultDDL(ddl) {
    return ddl.push({
      value: '',
      viewValue: 'อื่นๆ'
    });
  }

  public initCallbackURL() {
    if (this.channelCallbackService.callback.url) {
      return this.channelCallbackService.callback.url
        + '?txnId=' + this.channelCallbackService.callback.txnId
        + '&token=' + this.channelCallbackService.callback.token
        + '&txnStatus=' + (this.channelCallbackService.callback.txnStatus ? this.channelCallbackService.callback.txnStatus : 'fail')
        + '&employeeId=' + this.channelCallbackService.callback.employeeId
        + '&responseCode=' + this.channelCallbackService.callback.responseCode
        + '&responseMsg=' + this.channelCallbackService.callback.responseMsg;
    } else {
      return 'error';
    }
  }

  public tranformOpenAccountSummaryObj(data) {
    return {
      customerInfo: {
        name: data.customerProfile.customerFullNameTh,
        idCard: data.customerProfile.idNo,
        address: data.customerAddress.addressFull,
        email: data.customerProfile.customerEmail,
        mobile: data.customerProfile.customerMobile,
        addressSeq: data.customerAddress.addressSeq,
        emailSeq: data.customerProfile.customerEmailSeq,
        mobileSeq: data.customerProfile.customerMobileSeq,
        customerNumber: data.customerProfile.customerNumber
      },
      accountInfo: {
        accountNo: data.openAccountDetail.accountNo,
        accountNameTH: data.openAccountDetail.accountName,
        accountNameEN: data.openAccountDetail.accountEngName,
        accountProduct: data.openAccountDetail.productDesc,
        accountStatement: data.openAccountDetail.statementType,
        purpose: data.openAccountDetail.purposeAccountOpeningDesc,
        openAccountStatus: data.openAccountDetail.openAccountStatusDesc
      },
      subscriptionInfo: {
        productName: this.constants.SUBSCRIPTION.KK_E_BANKING,
        email: data.subscription.refCodeEmail,
        mobile: data.subscription.refCodeMobile,
        internetBanking: data.subscription.internetBanking
      },
      signature: {
        custSign: data.signature.custSign
      }
    };
  }
}
