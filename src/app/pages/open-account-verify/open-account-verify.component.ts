import { Component, OnInit } from '@angular/core';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { Constants } from 'src/app/shared/service/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ExceptionDialogComponent } from 'src/app/shared/components/popup/exception-dialog/exception-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-open-account-verify',
  templateUrl: './open-account-verify.component.html',
  styleUrls: ['./open-account-verify.component.sass']
})
export class OpenAccountVerifyComponent implements OnInit {

  constructor(
    private openAccountService: OpenAccountService,
    private constants: Constants,
    private router: Router,
    private route: ActivatedRoute,
    private channelCallbackService: ChannelCallbackService,
    private exceptionDialogService: ExceptionDialogService,
    private utilsService: UtilsService,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog
  ) { }

  openAccountVerify: any;
  transId: string;
  statusMessage: string;
  countTime: string;
  checkBTNResend = false;
  flgInterval: string;
  interval;

  ngOnInit() {
    if (this.flgInterval !== 'Y') {
      this.startCountdown(60);
    }
    this.openAccountVerify = this.openAccountService.openAccountVerify;
    this.transId = this.openAccountService.transId;
    this.statusMessage = this.getVerifyStatusMessage(this.openAccountVerify.custAuthenStatus);
  }

  retriveVerifyStatus() {
    this.ngxService.start();
    this.openAccountService.retriveOpenAccountVerify(this.transId).subscribe(response => {
      if (response.data !== null) {
        this.ngxService.stop();
        if (this.constants.CUST_AUTHEN_STATUS_CODE.PENDING === response.data.approveTransaction.custAuthenStatus) {
          this.statusMessage = this.getVerifyStatusMessage(response.data.approveTransaction.custAuthenStatus);
        } else {
          this.setCallbackTxnStatus(response.data.openAccountDetail.openAccountStatus, response.responseStatus.responseCode, response.responseStatus.responseMessage);
          this.openAccountService.openAccountSummary = this.utilsService.tranformOpenAccountSummaryObj(response.data);
          this.router.navigate(['/open-account-summary'], { relativeTo: this.route, skipLocationChange: true });
        }
      } else {
        this.ngxService.stop();
        this.setCallbackTxnStatus('', response.responseStatus.responseCode, response.responseStatus.responseMessage);
        this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param: response.responseStatus, refNo: this.channelCallbackService.callback.txnId, isShow: 'verify' }
        });
      }
    }, error => {
      this.ngxService.stop();
      this.exceptionDialogService.openDialogError();
      console.log('error', error);
    });
  }

  private getVerifyStatusMessage(status) {
    switch (status) {
      case this.constants.CUST_AUTHEN_STATUS_CODE.PENDING: {
        return this.constants.CUST_AUTHEN_STATUS_MESSAGE.PENDING;
        break;
      }
      case this.constants.CUST_AUTHEN_STATUS_CODE.REJECTED: {
        return this.constants.CUST_AUTHEN_STATUS_MESSAGE.REJECTED;
        break;
      }
      case this.constants.CUST_AUTHEN_STATUS_CODE.COMPLETED: {
        return this.constants.CUST_AUTHEN_STATUS_MESSAGE.COMPLETED;
        break;
      }
    }
  }

  private setCallbackTxnStatus(txnStatus: string, responseCode: string, responseMessage: string): void {
    this.channelCallbackService.callback.txnStatus = txnStatus;
    this.channelCallbackService.callback.responseCode = responseCode;
    this.channelCallbackService.callback.responseMsg = responseMessage;
  }

  // FUNC RESEND RP CHENG REFERENCE ID
  resendRPRequest() {
    this.checkBTNResend = false;
    this.openAccountService.resendRPRequest(this.transId).subscribe(response => {
      this.flgInterval = response.data === null ? '' : response.data.maxResendFlg;
      if (response.header.success) {
        this.openAccountService.openAccountVerify = {
          referenceId: response.data.referenceId,
          custAuthenStatus: response.data.custAuthenStatus
        };
      } else {
        this.checkBTNResend = false;
        const resStatus = this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param: response.responseStatus, refNo: this.channelCallbackService.callback.txnId, isShow: 'verify' }
        });
        resStatus.afterClosed().subscribe(resultStatus => {
          if (resultStatus) {
            this.retriveVerifyStatus();
          }
        });
      }
      this.ngOnInit();
    }, error => {
      console.log(error.responseStatus.responseMessage);
    });
  }

  startCountdown(seconds) {
    let counter = seconds;
    this.interval = setInterval(() => {
      this.countTime = counter;
      counter--;
      if (counter < 0) {
        this.checkBTNResend = true;
        this.countTime = '';
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
