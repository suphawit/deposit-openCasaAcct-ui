import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreOpenAccountService } from '../../pages/open-account/service/pre-open-account.service';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service';
// IMPORT COMPONENT
import { ExceptionDialogComponent } from 'src/app/shared/components/popup/exception-dialog/exception-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.sass']
})
export class ResendEmailComponent implements OnInit {

  constructor(
    private preOpenAccountService: PreOpenAccountService,
    private exceptionDialogService: ExceptionDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private masterDataService: MasterDataService,
    public dialog: MatDialog
  ) { }
  dataInquiry: any;
  dataCondition: any;
  dataDetail: any = [];

  ngOnInit() {
    this.dataInquiry = this.preOpenAccountService.getTransId();
    this.getInquiryAccountAddress();
  }

  getInquiryAccountAddress() {
    this.masterDataService.getInquiryAccountAddress(this.dataInquiry.transId).subscribe(response => {
      if (response.data) {
        this.dataDetail = response.data;
      } else {
        const resStatus = this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param: 'data not found', isShow: 'resendEmail' }
        });
        resStatus.afterClosed().subscribe(resultStatus => {
          if (resultStatus) {
            this.router.navigate(['/open-inquiry'], { relativeTo: this.route, skipLocationChange: true });
            window.location.reload();
          }
        });
      }
    });
  }
  resendEmail() {
    this.masterDataService.getResendEmail(this.dataDetail.emailCbs, this.dataInquiry).subscribe(response => {
      if (response.data) {
        const resStatus = this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param: response.data.sendMailStatus, isShow: 'resendEmail' }
        });
        resStatus.afterClosed().subscribe(resultStatus => {
          if (resultStatus) {
            this.router.navigate(['/open-inquiry'], { relativeTo: this.route, skipLocationChange: true });
            window.location.reload();
          }
        });
      } else {
        const resStatus = this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param: response.responseStatus, status: 'fail', isShow: 'resendEmail' }
        });
        resStatus.afterClosed().subscribe(resultStatus => {
          if (resultStatus) {
            this.router.navigate(['/open-inquiry'], { relativeTo: this.route, skipLocationChange: true });
            window.location.reload();
          }
        });
      }
    }, error => {
      console.log(error.responseStatus.responseMessage);
    });
  }
  goToBack() {
    this.router.navigate(['/open-inquiry'], { relativeTo: this.route, skipLocationChange: true });
    window.location.reload();
  }

}
