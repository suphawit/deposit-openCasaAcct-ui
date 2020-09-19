import { Component, OnInit } from '@angular/core';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.sass']
})
export class ServerErrorComponent implements OnInit {

  callBackList: any = [];
  param: any = [];
  constructor(
    private openAccountService: OpenAccountService,
    private http: HttpClient,
    private channelCallbackService: ChannelCallbackService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private routeSubscription: Subscription;

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.refcode) {
        this.param = { errorType: 'app', custRef: params.refcode };
      } else if (params.logid) {
        this.param = { errorType: 'inquiry', custRef: params.logid };
      }
      this.openAccountService.getResponseCallBack(this.param).subscribe(response => {
        // console.log('SSSSS', response)
        this.callBackList = response;
        this.setCallback(this.callBackList.data);
      });
    });
  }
  setCallback(data) {
    this.channelCallbackService.callback.url = data.url;
    this.channelCallbackService.callback.txnId = data.referenceNo;
    this.channelCallbackService.callback.token = data.token;
    this.channelCallbackService.callback.txnStatus = data.txnStatus;
    this.channelCallbackService.callback.employeeId = data.employeeId;
    this.channelCallbackService.callback.responseCode = data.respCode;
    this.channelCallbackService.callback.responseMsg = data.respMsg;
  }
  endCallBack() {
    window.location.href = this.utilsService.initCallbackURL();
  }
}
