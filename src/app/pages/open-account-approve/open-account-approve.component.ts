import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/service/constants';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';

@Component({
  selector: 'app-open-account-approve',
  templateUrl: './open-account-approve.component.html',
  styleUrls: ['./open-account-approve.component.sass']
})
export class OpenAccountApproveComponent implements OnInit {

  constructor(
    private channelCallbackService: ChannelCallbackService,
    private openAccountService: OpenAccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private exceptionDialogService: ExceptionDialogService,
    private utilsService: UtilsService
  ) { }

  approveFormGroup: FormGroup;

  openAccountInfos: { text: any; cols: number; rows: number; color: string; }[];
  openAccountPreview: any;
  statement: any;
  isShow: any;

  ngOnInit(): void {
    this.openAccountPreview = this.openAccountService.openAccountInfo;
    this.isShow = (this.openAccountPreview.subscriptionInfo.internetBanking === 'N' ? false : true);
    this.statement = this.openAccountPreview.accountInfo.accountStatement == 'สมุดคู่ฝาก/Passbook' ? 'Passbook' : this.openAccountPreview.accountInfo.accountStatement;
    this.openAccountInfos = [
      { text: 'ชื่อ-นามสกุล', cols: 1, rows: 1, color: '' },
      { text: this.openAccountPreview.customerInfo.name, cols: 1, rows: 1, color: '' },
      { text: 'เลขประจำตัวประชาชน/เลขหนังสือเดินทาง', cols: 1, rows: 1, color: '' },
      { text: this.openAccountPreview.customerInfo.idCard, cols: 1, rows: 1, color: '' },
      { text: 'ชื่อบัญชี', cols: 1, rows: 1, color: '' },
      { text: this.openAccountPreview.accountInfo.accountNameTH, cols: 1, rows: 1, color: 'color' },
      { text: 'ชื่อบัญชีภาษาอังกฤษ', cols: 1, rows: 1, color: '' },
      { text: this.openAccountPreview.accountInfo.accountNameEN, cols: 1, rows: 1, color: 'color' }
    ];

    this.approveFormGroup = this.formBuilder.group({
      transId: [this.openAccountService.transId],
      userId: [''],
      password: [''],
      status: ['']
    });
  }

  onSubmitOpenAccountApprove(approval) {
    let submitForm = this.approveFormGroup.value;
    if (submitForm.userId === '' || submitForm.password === '') { return }
    this.approveFormGroup.value.status = approval;
    this.openAccountService.approveOpenAccount(this.approveFormGroup.value).subscribe(response => {
      if (response.responseStatus.responseCode === 'EAPP-I-1000' && response.data.approveTransaction.referenceId) {
        // if (response.data.approveTransaction.referenceId) {
        this.openAccountService.openAccountVerify = {
          referenceId: response.data.approveTransaction.referenceId,
          custAuthenStatus: response.data.approveTransaction.custAuthenStatus
        };
        this.router.navigate(['/open-account-verify'], { relativeTo: this.route, skipLocationChange: true });
      } else if (response.responseStatus.responseCode === 'EAPP-E-9020') {
        this.setCallbackStatus(response.data.openAccountDetail.openAccountStatus, response.responseStatus.responseCode, response.responseStatus.responseMessage);
        this.openAccountService.openAccountSummary = this.utilsService.tranformOpenAccountSummaryObj(response.data);
        this.router.navigate(['/open-account-summary'], { relativeTo: this.route, skipLocationChange: true });
        // }
      } else if (response.responseStatus.responseCode === 'EAPP-E-9007' || response.responseStatus.responseCode === 'EAPP-E-9004' || response.responseStatus.responseCode === 'EAPP-E-9009') {
        this.exceptionDialogService.popUp(response.responseStatus);
      } else {
        this.channelCallbackService.callback.responseCode = response.responseStatus.responseCode;
        this.channelCallbackService.callback.responseMsg = response.responseStatus.responseMessage;
        this.exceptionDialogService.openDialogError(response.responseStatus);
      }
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }
  private setCallbackStatus(txnStatus: string, responseCode: string, responseMessage: string): void {
    this.channelCallbackService.callback.txnStatus = txnStatus;
    this.channelCallbackService.callback.responseCode = responseCode;
    this.channelCallbackService.callback.responseMsg = responseMessage;
  }
}
