import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service.js';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/service/constants';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';

@Component({
  selector: 'app-open-account-step-summary',
  templateUrl: './open-account-step-summary.component.html',
  styleUrls: ['./open-account-step-summary.component.sass']
})
export class OpenAccountStepSummaryComponent implements OnInit {

  constructor(
    private openAccountFormService: OpenAccountFormService,
    private masterDataService: MasterDataService,
    private channelCallbackService: ChannelCallbackService,
    private openAccountService: OpenAccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private exceptionDialogService: ExceptionDialogService,
    private constants: ExceptionDialogService,
  ) { }
  @Input() stepper: any;
  @Input() summaryFormGroup: FormGroup;
  @Input() approveFormGroup: FormGroup;
  @Input() customerData: any;
  @Output() disableStepper = new EventEmitter();

  openAccountInfos: { text: any; cols: number; rows: number; color: string; }[];
  openAccountPreview: any;
  statement: any;
  isShow: any;
  checkForm = false;
  checkBtn = false;
  checkApproveForm = false;
  checkReason = false;
  checkBtnApprove = false;

  ngOnInit() { }

  // FUNCTION GET DATA FORM SERVICE OPENACCOUNT
  getSummaryDetail() {
    this.checkForm = true;
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
      transId: [''],
      userId: [''],
      password: [''],
      status: [''],
      authorReason: ['']
    });
  }

  // FUNCTION GET FORM DATA AND SUBMIT FORM DATA INSERT TO DATABASE
  openAccount() {
    this.checkBtn = true;
    this.openAccountService.submitOpenAccount(this.openAccountFormService.mainForm.value).subscribe(response => {
      if (response.header.success) {
        this.openAccountService.transId = response.data.transId;
        this.approveFormGroup.patchValue({ transId: response.data.transId === '' ? '' : response.data.transId });
        if (response.data.approvalFlg === 'Y') {
          this.disableStepper.emit();
          this.checkForm = false;
          this.checkApproveForm = true;
        } else {
          this.openAccountService.openAccountVerify = {
            referenceId: response.data.referenceId,
            custAuthenStatus: response.data.custAuthenStatus
          };
          this.router.navigate(['/open-account-verify'], { relativeTo: this.route, skipLocationChange: true });
        }
      } else if (response.responseStatus.responseCode === 'EAPP-E-9010' || response.responseStatus.responseCode === 'EAPP-E-9005' || response.responseStatus.responseCode === 'EAPP-E-9005') {
        this.checkBtn = false;
        this.exceptionDialogService.popUp(response.responseStatus);
      } else if (response.responseStatus.responseCode === 'EAPP-E-9011') {
        this.channelCallbackService.callback.responseCode = response.responseStatus.responseCode;
        this.channelCallbackService.callback.responseMsg = response.responseStatus.responseMessage;
        window.location.href = this.utilsService.initCallbackURL();
      } else {
        this.channelCallbackService.callback.responseCode = response.responseStatus.responseCode;
        this.channelCallbackService.callback.responseMsg = response.responseStatus.responseMessage;
        this.exceptionDialogService.openDialogError(response.responseStatus);
      }
    }, error => {
      console.log('ERROR : ', error);
      this.exceptionDialogService.openDialogError();
    });
  }

  // FUNCTION APPROVE OPEN ACCOUNT
  onSubmitOpenAccountApprove(approval) {
    this.checkBtnApprove = true;
    const submitForm = this.approveFormGroup.value;
    if (submitForm.userId === '' || submitForm.password === '') { return this.checkBtnApprove = false; }
    if (approval === 'rejected' && this.approveFormGroup.get('authorReason').value === '') {
      this.checkBtnApprove = false;
      return this.checkReason = true;
    }
    this.approveFormGroup.value.status = approval;
    this.openAccountService.approveOpenAccount(this.approveFormGroup.value).subscribe(response => {
      if (response.responseStatus.responseCode === 'EAPP-I-1000' && response.data.approveTransaction.referenceId) {
        this.openAccountService.openAccountVerify = {
          referenceId: response.data.approveTransaction.referenceId,
          custAuthenStatus: response.data.approveTransaction.custAuthenStatus
        };
        this.router.navigate(['/open-account-verify'], { relativeTo: this.route, skipLocationChange: true });
      } else if (response.responseStatus.responseCode === 'EAPP-E-9020') {
        this.setCallbackStatus(response.data.openAccountDetail.openAccountStatus, response.responseStatus.responseCode, response.responseStatus.responseMessage);
        this.openAccountService.openAccountSummary = this.utilsService.tranformOpenAccountSummaryObj(response.data);
        this.router.navigate(['/open-account-summary'], { relativeTo: this.route, skipLocationChange: true });
      } else if (response.responseStatus.responseCode === 'EAPP-E-9007' || response.responseStatus.responseCode === 'EAPP-E-9005' || response.responseStatus.responseCode === 'EAPP-E-9004' || response.responseStatus.responseCode === 'EAPP-E-9009' || response.responseStatus.responseCode === 'EAPP-E-9028') {
        this.checkBtnApprove = false;
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
