import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreOpenAccountService } from '../open-account/service/pre-open-account.service';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';

@Component({
  selector: 'app-access-open-account',
  templateUrl: './access-open-account.component.html',
  styleUrls: ['./access-open-account.component.sass']
})
export class AccessOpenAccountComponent implements OnInit, OnDestroy {

  constructor(
    private preOpenAccountService: PreOpenAccountService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private channelCallbackService: ChannelCallbackService,
    private exceptionDialogService: ExceptionDialogService
  ) { }

  private routeSubscription: Subscription;

  ngOnInit() {
    // window.location.reload();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.customerService.getCustomerProfile(params.refcode).subscribe(response => {
        // console.log('DATA', response);
        if (response.header.success) {
          Object.assign(response.data, {
            refcode: params.refcode
          });
          // this.preOpenAccountService.setTest(params.refcode);
          this.preOpenAccountService.setCustomerSource(response.data);
          this.channelCallbackService.callback = response.data.callback;
          this.router.navigate(['/open-account'], { relativeTo: this.route, skipLocationChange: true });
        } else {
          this.exceptionDialogService.openDialogError(response.responseStatus);
        }
      }, error => {
        console.log('ERROR : ', error);
        this.exceptionDialogService.openDialogError();
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}