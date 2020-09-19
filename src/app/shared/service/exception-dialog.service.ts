import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExceptionDialogComponent } from '../components/popup/exception-dialog/exception-dialog.component';
import { ChannelCallbackService } from './channel-callback.service';


@Injectable({
  providedIn: 'root'
})
export class ExceptionDialogService {

  constructor(public dialog: MatDialog, private channelCallbackService: ChannelCallbackService) { }
  public openDialogError(param: any = []) {
    setTimeout(() => {
      if (param.length === 0) {
        this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: {
            param: {
              responseMessage: 'เกิดข้อผิดพลาดในระบบ กรุณาติดต่อเจ้าหน้าที่',
              responseCode: ''
            },
            isShow: 'MODAL_CENTER'
          }
        });
      } else {
        this.dialog.open(ExceptionDialogComponent, {
          disableClose: true,
          width: '500px',
          data: { param, refNo: this.channelCallbackService.callback.txnId, isShow: 'SHOW_REFERENCE' }
        });
      }
    });
  }
  public popUp(param: any = []) {
    setTimeout(() => {
      this.dialog.open(ExceptionDialogComponent,
        {
          disableClose: true,
          width: '500px',
          data: { param, isShow: 'SHOW_RESPONSE' }
        });
    });
  }
}
