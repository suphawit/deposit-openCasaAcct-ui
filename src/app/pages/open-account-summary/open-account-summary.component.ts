import { Component, OnInit } from '@angular/core';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-open-account-summary',
  templateUrl: './open-account-summary.component.html',
  styleUrls: ['./open-account-summary.component.sass']
})
export class OpenAccountSummaryComponent implements OnInit {

  constructor(
    private openAccountService: OpenAccountService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  openAccountInfos: { text: any; cols: number; rows: number; color: string; }[];
  openAccountSummary: any;
  openAccountVerify: any;
  isShow: any;
  reportPDF: any;
  checkBtn = false;
  checkBtnOpenAppForm = false;
  checkBtnExportPDF = true;
  transId: string;

  ngOnInit() {
    this.openAccountVerify = this.openAccountService.openAccountVerify;
    this.openAccountSummary = this.openAccountService.openAccountSummary;
    this.transId = this.openAccountService.transId;
    this.isShow = (this.openAccountSummary.subscriptionInfo.internetBanking === 'N' ? false : true);
    this.openAccountInfos = [
      { text: 'ชื่อ-นามสกุล', cols: 1, rows: 1, color: '' },
      { text: this.openAccountSummary.customerInfo.name, cols: 1, rows: 1, color: '' },
      { text: 'เลขประจำตัวประชาชน/เลขหนังสือเดินทาง', cols: 1, rows: 1, color: '' },
      { text: this.openAccountSummary.customerInfo.idCard, cols: 1, rows: 1, color: '' },
      { text: 'ชื่อบัญชี', cols: 1, rows: 1, color: '' },
      { text: this.openAccountSummary.accountInfo.accountNameTH, cols: 1, rows: 1, color: 'color' },
      { text: 'ชื่อบัญชีภาษาอังกฤษ', cols: 1, rows: 1, color: '' },
      { text: this.openAccountSummary.accountInfo.accountNameEN, cols: 1, rows: 1, color: 'color' }
    ];
    if (this.openAccountSummary.accountInfo.openAccountStatus === 'สำเร็จ') {
      this.openAccountService.getOpenAccountReport(this.transId).subscribe(response => {
        this.reportPDF = response;
      }, error => {
        console.log('ERROR : ', error);
      });
    } else {
      this.checkBtnOpenAppForm = false;
      this.checkBtnExportPDF = false;
      this.checkBtn = true;
    }
  }

  onEndProcess() {
    window.location.href = this.utilsService.initCallbackURL();
  }

  // GET DOWLOAD PDF FILE
  exportPDF() {
    const dataBase64 = 'data:application/pdf;base64,' + this.reportPDF.data.reportCode;
    const downloadLink = document.createElement('a');
    const fileName = 'openaccountform.pdf';
    downloadLink.href = dataBase64;
    downloadLink.download = fileName;
    downloadLink.click();
    this.checkBtn = true;
    this.checkBtnOpenAppForm = true;
  }

  // FUNCTION GET INTENAL OPENAPP FROM REDIRECT TO OPEN ACCOUNT 2
  getIntenalOpenAppForm() {
    this.openAccountService.getIntenalOpenAppForm(this.openAccountVerify.referenceId, this.openAccountSummary).subscribe(response => {
      window.location.href = response.data.directUrl;
    }, (error: HttpErrorResponse) => {
      console.log('ERROR', error);
    });
  }

  // exportSignature(signaturePath) {
  //   const blob = new Blob([signaturePath], { type: '.jpg' });
  //   const fileName = this.openAccountSummary.accountInfo.accountNo + '_' + this.openAccountSummary.customerInfo.name + '.jpg';
  //   if (window.navigator.msSaveOrOpenBlob) { // IE & E
  //     window.navigator.msSaveBlob(blob, fileName);
  //   } else {
  //     const downloadURl = document.createElement('a');
  //     downloadURl.href = signaturePath;
  //     downloadURl.download = fileName;
  //     downloadURl.click();
  //   }
  // }
}