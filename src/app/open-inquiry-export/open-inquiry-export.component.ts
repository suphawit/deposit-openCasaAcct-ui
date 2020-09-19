import { Component, OnInit, Input, ViewChild, Injectable, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as moment from 'moment';

// FORMAT DATE
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';

// CALL SERVICE
import { PreOpenAccountService } from 'src/app/pages/open-account/service/pre-open-account.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';

// IMPORT COMPONENT
import { ExceptionDialogComponent } from 'src/app/shared/components/popup/exception-dialog/exception-dialog.component';
import { MatDialog } from '@angular/material';

export interface Search {
  value: string;
  viewValue: string;
}
export interface Customer {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-open-inquiry-export',
  templateUrl: './open-inquiry-export.component.html',
  styleUrls: ['./open-inquiry-export.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

@Injectable()
export class OpenInquiryExportComponent implements OnInit {
  displayedColumns: string[] = [
    'productType', 'accountNo', 'accountName', 'idTypeDesc', 'idNo',
    'txnDate', 'fetcaStatus', 'statusSendMail', 'resend'
  ];

  constructor(
    private preOpenAccountService: PreOpenAccountService,
    private masterDataService: MasterDataService,
    private utilsService: UtilsService,
    private exceptionDialogService: ExceptionDialogService,
    private FB: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private channelCallbackService: ChannelCallbackService,
    public dialog: MatDialog,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  searchsForm = new FormGroup({
    fullNameCtrl: new FormControl(''),
    productTypeCtrl: new FormControl(''),
    accountNoCtrl: new FormControl(''),
    statusDateCtrl: new FormControl(''),
    idCardNoCtrl: new FormControl(''),
    identificationDocumentTypeCtrl: new FormControl(' '),
    countryTypeCtrl: new FormControl('TH'),
    tellerIdCtrl: new FormControl('')
  });

  dataReqSearchForm: FormGroup;
  dataTable = false;
  checkFormCount = false;
  checkRequired = false;
  checkBtnsend = false;
  selectedproductType: string;
  selectedidentificationNo: string;
  selectedcountry: string;
  selected = ' ';
  productTypes: any = [];
  countryLists: any = [];
  customerLists: any = [];
  dataInquiryByLogLd: any = [];
  dataDate: any = [];
  txnDate: any = [];
  dataCondition: any = [];

  routeSubscription: Subscription;
  pageEvent: PageEvent;
  dataSource = new MatTableDataSource();
  dt = new Date();
  minDate = moment(this.dt).subtract(89, 'days').toDate();
  dataRes: any = [];
  length: any = [];
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit() {
    this.searchsForm.get('idCardNoCtrl').disable();
    this.getInquiryByLogLd();
    this.getCountryList();
    this.getCustomerIdType();
    this.getProductType();
    this.dataCondition = this.storage.get('DATA');
    if (this.dataCondition !== undefined) {
      this.searchCondition(this.dataCondition);
    }
  }

  getInquiryByLogLd() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.masterDataService.getInquiryByLogLd(params).subscribe(response => {
        if (response.header.success) {
          this.dataInquiryByLogLd = response;
        } else {
          this.exceptionDialogService.openDialogError(response.responseStatus);
        }
      }, error => {
        console.log('ERROR : ', error);
        this.exceptionDialogService.openDialogError();
      });
    });
  }
  private SearchForm() {
    this.dataReqSearchForm = this.FB.group({
      fullName: this.searchsForm.value.fullNameCtrl,
      accountType: this.searchsForm.value.productTypeCtrl,
      accountNo: this.searchsForm.value.accountNoCtrl,
      txnDate: this.searchsForm.value.statusDateCtrl === null || this.searchsForm.value.statusDateCtrl === '' ? '' : this.datePipe.transform(this.searchsForm.value.statusDateCtrl, 'yyyyMMdd'),
      idNo: this.searchsForm.value.idCardNoCtrl === null || this.searchsForm.value.idCardNoCtrl === undefined ? '' : this.searchsForm.value.idCardNoCtrl,
      idTypeCode: this.searchsForm.value.identificationDocumentTypeCtrl === ' ' ? '' : this.searchsForm.value.identificationDocumentTypeCtrl,
      countryCode: this.searchsForm.value.idCardNoCtrl === '' || this.searchsForm.value.idCardNoCtrl === undefined ? '' : this.searchsForm.value.countryTypeCtrl,
      branchNo: this.dataInquiryByLogLd.data.branchNo === null ? '' : this.dataInquiryByLogLd.data.branchNo,
      tellerId: this.searchsForm.value.tellerIdCtrl,
      currentPage: this.pageEvent === undefined || this.pageEvent === null ? 0 : this.pageEvent.pageIndex,
      dataPerPage: this.pageEvent === undefined || this.pageEvent === null ? 10 : this.pageEvent.pageSize,
      pagingStatus: 'Y',
    });
    const dateCurrent = this.searchsForm.value.statusDateCtrl === '' || this.searchsForm.value.statusDateCtrl === null ? '' : new Date(this.searchsForm.value.statusDateCtrl)
    this.storage.set('DATE_CURRENT', dateCurrent === '' ? '' : dateCurrent);
    return this.dataReqSearchForm.value;
  }

  getProductType() {
    this.masterDataService.getProductTypes().subscribe(productTypes => {
      this.productTypes = productTypes.map(data => {
        return this.utilsService.transformCommonDDL(data.productType, data.productDesc);
      });
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }
  getCountryList() {
    this.masterDataService.getCountryList().subscribe(countrys => {
      this.countryLists = countrys.map(data => {
        return this.utilsService.transformCommonDDL(data.countryCode, data.countryCode + ' - ' + data.longDescEn);
      }, error => {
        this.exceptionDialogService.openDialogError();
        console.log(error);
      });
    });
  }

  getCustomerIdType() {
    this.masterDataService.getAllCustomerIdType().subscribe(customers => {
      this.customerLists = customers.data.customerIDTypeList.map(data => {
        return this.utilsService.transformCommonDDL(data.idTypeCode, data.idTypeCode + '-' + data.longDescLocal);
      }, error => {
        this.exceptionDialogService.openDialogError();
        console.log(error);
      });
    });
  }

  search() {
    if (this.searchsForm.value.fullNameCtrl === '' && this.searchsForm.value.productTypeCtrl === ''
      && this.searchsForm.value.accountNoCtrl === '' && this.searchsForm.value.statusDateCtrl === ''
      && this.searchsForm.value.identificationDocumentTypeCtrl === ' ' && this.searchsForm.value.tellerIdCtrl === '') {
      this.checkRequired = true;
      this.dataTable = false;
    } else {
      if (this.searchsForm.value.identificationDocumentTypeCtrl !== '') {
        if (this.searchsForm.value.idCardNoCtrl === '') {
          return this.dataTable = false;
        }
      }
      this.checkRequired = false;
      this.dataTable = true;
      const dataReq = this.SearchForm();
      this.masterDataService.searchOpenInquiry(dataReq).subscribe(resultSearch => {
        this.dataRes = resultSearch.data.searchResultList;
        this.dataSource = new MatTableDataSource(this.dataRes);
        this.length = resultSearch.data.totalData;
      });
    }
  }

  // SEARCH CONDITION AFTER RESEND E-MAIL BACK TO INQUIRY PAGE
  searchCondition(data) {
    if (data.fullNameCtrl === '' && data.productTypeCtrl === ''
      && data.accountNoCtrl === '' && data.statusDateCtrl === ''
      && data.identificationDocumentTypeCtrl === ' ' && data.tellerIdCtrl === '') {
      this.checkRequired = true;
      this.dataTable = false;
    } else {
      if (data.identificationDocumentTypeCtrl !== '') {
        if (data.idCardNoCtrl === '') {
          return this.dataTable = false;
        }
      }
      if (data.idTypeCode !== '') {
        this.checkFormCount = true;
        this.searchsForm.get('idCardNoCtrl').enable();
      }

      const DATE_CURRENT = this.storage.get('DATE_CURRENT') === '' ? '' : new Date(this.storage.get('DATE_CURRENT'));
      this.searchsForm.patchValue({ fullNameCtrl: data.fullName === '' ? '' : data.fullName });
      this.searchsForm.patchValue({ productTypeCtrl: data.accountType === '' ? '' : data.accountType });
      this.searchsForm.patchValue({ accountNoCtrl: data.accountNo === '' ? '' : data.accountNo });
      this.searchsForm.patchValue({ statusDateCtrl: DATE_CURRENT });
      this.searchsForm.patchValue({ idCardNoCtrl: data.idNo === '' ? '' : data.idNo });
      this.searchsForm.patchValue({ identificationDocumentTypeCtrl: data.idTypeCode === '' ? ' ' : data.idTypeCode });
      this.searchsForm.patchValue({ countryTypeCtrl: data.countryCode === '' ? '' : data.countryCode });
      this.searchsForm.patchValue({ tellerIdCtrl: data.tellerId === '' ? '' : data.tellerId });
      this.currentPage = data.currentPage;
      this.checkRequired = false;
      this.dataTable = true;
      const dataReq = data;
      this.masterDataService.searchOpenInquiry(dataReq).subscribe(resultSearch => {
        this.dataRes = resultSearch.data.searchResultList;
        this.dataSource = new MatTableDataSource(this.dataRes);
        this.length = resultSearch.data.totalData;
        this.storage.clear();
        this.searchsForm.get('countryTypeCtrl').setValue('TH');
      });
    }
  }

  changCustomertValue(data) {
    if (data === '' || data === null || data === ' ') {
      this.checkFormCount = false;
      this.searchsForm.get('idCardNoCtrl').reset();
      this.searchsForm.get('idCardNoCtrl').disable();
      this.searchsForm.get('countryTypeCtrl').setValue('TH');
    } else {
      this.checkRequired = false;
      this.checkFormCount = true;
      this.searchsForm.get('idCardNoCtrl').enable();
      this.searchsForm.get('idCardNoCtrl').setValue('');
      this.searchsForm.get('countryTypeCtrl').setValue('TH');
    }
  }

  callBack(dataCallback) {
    this.channelCallbackService.callback.url = dataCallback.data.callbackUrl,
      this.channelCallbackService.callback.txnId = dataCallback.data.referenceNo,
      this.channelCallbackService.callback.token = dataCallback.data.token,
      this.channelCallbackService.callback.employeeId = dataCallback.data.tellerId,
      this.channelCallbackService.callback.txnStatus = dataCallback.responseStatus.responseCode === '' ? 'success' : 'fail';
    this.channelCallbackService.callback.responseCode = dataCallback.responseStatus.responseCode;
    this.channelCallbackService.callback.responseMsg = dataCallback.responseStatus.responseMessage;
    window.location.href = this.utilsService.initCallbackURL();
  }

  // exportSignature(data) {
  //   this.routeSubscription = this.route.params.subscribe(params => {
  //     this.masterDataService.getSignatureURL(data.transId, params.logid).subscribe(response => {
  //       if (response) {
  //         const blob = new Blob([response.data.custSign], { type: '.jpg' });
  //         const fileName = data.accountNo + '_' + data.fullName + '.jpg';
  //         if (navigator.msSaveBlob) { // IE & E
  //           window.navigator.msSaveBlob(blob, fileName);
  //         } else {
  //           const downloadURl = document.createElement('a');
  //           downloadURl.href = response.data.custSign;
  //           downloadURl.download = fileName;
  //           downloadURl.click();
  //         }
  //       }
  //     });
  //   });
  // }
  clearForm() {
    this.storage.clear();
    this.searchsForm.reset();
    this.searchsForm.get('fullNameCtrl').setValue('');
    this.searchsForm.get('productTypeCtrl').setValue('');
    this.searchsForm.get('accountNoCtrl').setValue('');
    this.searchsForm.get('statusDateCtrl').setValue('');
    this.searchsForm.get('tellerIdCtrl').setValue('');

    this.getInquiryByLogLd();
    this.getCountryList();
    this.getCustomerIdType();
    this.getProductType();

    this.checkFormCount = false;
    this.dataTable = false;
    this.checkRequired = true;

    this.searchsForm.get('idCardNoCtrl').disable();
    this.searchsForm.get('identificationDocumentTypeCtrl').setValue(' ');
    this.searchsForm.get('countryTypeCtrl').setValue('TH');
  }

  change() {
    this.pageEvent = null;
    this.dataTable = false;
    this.currentPage = 0;
  }

  resendEmail(transId) {
    this.checkBtnsend = true;
    this.routeSubscription = this.route.params.subscribe(params => {
      this.preOpenAccountService.setTransId(transId, params.logid);
    });
    const dataReq = this.SearchForm();
    this.storage.set('DATA', dataReq);
    this.router.navigate(['/resend-email'], { relativeTo: this.route, skipLocationChange: true });
  }
}
