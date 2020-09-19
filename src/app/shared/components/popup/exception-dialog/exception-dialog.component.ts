import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChannelCallBack } from '../channel-callback';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { PreOpenAccountService } from 'src/app/pages/open-account/service/pre-open-account.service';

@Component({
  selector: 'app-exception-dialog',
  templateUrl: './exception-dialog.component.html',
  styleUrls: ['./exception-dialog.component.sass']
})
export class ExceptionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ExceptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChannelCallBack,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private preOpenAccountService: PreOpenAccountService,
  ) { }

  onCloseDialog(data): void {
    if (data === 'EAPP-E-9010' || data === 'EAPP-E-9007' || data === 'EAPP-E-9004' || data === 'EAPP-E-9005' || data === 'EAPP-E-9009' || data === 'EAPP-E-9028') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      const urlCallback = this.utilsService.initCallbackURL();
      if (urlCallback === 'error') {
        this.router.navigate(['/error'], { relativeTo: this.route, skipLocationChange: true });
      } else {
        window.location.href = urlCallback;
      }
    }
  }

  verify(responseCode) {
    if (this.data.isShow === 'verify') {
      switch (responseCode) {
        case 'EAPP-E-9005':
          this.dialogRef.close(false);
          break;
        case 'EAPP-E-9030':
          this.dialogRef.close(false);
          break;
        case 'EAPP-E-9031':
          this.dialogRef.close(false);
          break;
        case 'EAPP-E-9032':
          this.dialogRef.close(true);
          break;
        case 'EAPP-E-9033':
          this.dialogRef.close(true);
          break;
        default:
          this.dialogRef.close();
          window.location.href = this.utilsService.initCallbackURL();
      }
    }
  }
  resendEmailBack() {
    this.dialogRef.close(true);
  }
  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
