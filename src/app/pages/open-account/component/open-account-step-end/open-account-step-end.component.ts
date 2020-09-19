import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MasterDataService } from 'src/app/shared/service/master-data.service.js';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ExceptionDialogComponent } from 'src/app/shared/components/popup/exception-dialog/exception-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-open-account-step-end',
  templateUrl: './open-account-step-end.component.html',
  styleUrls: ['./open-account-step-end.component.sass']
})
export class OpenAccountStepEndComponent implements OnInit {
  @Input() stepper: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Output() submitOpenAccount = new EventEmitter();


  public signaturePadOptions: Object = {
    'minWidth': 1,
    'canvasWidth': 500,
    'backgroundColor': 'rgb(255, 255, 255)',
  };
  marketConductContent: any = [];
  termAndCondContent: any;
  serviceContent: any = [];
  answerDatas: any = [];
  termAndCond = 'TERM_COND';
  marketConduct = 'MKT_CONDUCT';
  serviceCond = 'SERVICE_COND';

  constructor(
    private openAccountFormService: OpenAccountFormService,
    private masterDataService: MasterDataService,
    private utilsService: UtilsService,
    public dialog: MatDialog
  ) { }

  @Input()
  termAndConditionFormGroup: FormGroup;

  ngOnInit() {
    this.getTermAndCondContent();
    this.getMarketConductContent();
    this.getServiceContent();
  }

  setupFormReady() {
    this.openAccountFormService.stepReady(this.termAndConditionFormGroup, 'end');
  }

  getTermAndCondContent() {
    this.masterDataService.getContent(this.termAndCond).subscribe(dataTermAndCond => {
      if (dataTermAndCond.header.success) {
        this.answerDatas = dataTermAndCond.data.contentList[0].content.answerList.map(data => {
          return data;
        });
        this.termAndCondContent = dataTermAndCond.data.contentList.map(res => {
          return res;
        });
        this.termAndConditionFormGroup.patchValue({ acceptTermAndConVersionCtrl: dataTermAndCond.data.contentVersion });
      } else {
        this.termAndCondContent = 'DATA NOT FOUND';
      }
    });
  }

  getMarketConductContent() {
    this.masterDataService.getContent(this.marketConduct).subscribe(dataMarketConduct => {
      if (dataMarketConduct.header.success) {
        this.marketConductContent = dataMarketConduct;
        this.termAndConditionFormGroup.patchValue({ marketConductVersionCtrl: this.marketConductContent.data.contentVersion });
      } else {
        this.marketConductContent = 'DATA NOT FOUND';
      }
    });
  }
  getServiceContent() {
    this.masterDataService.getContent(this.serviceCond).subscribe(dataService => {
      if (dataService.header.success) {
        this.serviceContent = dataService.data.contentList.map(data => {
          return data;
        });
      } else {
        this.serviceContent = 'DATA NOT FOUND';
      }
    });
  }

  onSubmit() {
    const resStatus = this.dialog.open(ExceptionDialogComponent, {
      disableClose: true,
      width: '500px',
      data: { isShow: 'Term & Condition' }
    });
    resStatus.afterClosed().subscribe(resultStatus => {
      if (resultStatus) {
        this.submitOpenAccount.emit();
      } else {

      }
    });
  }
}
