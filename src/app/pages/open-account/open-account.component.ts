import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenAccountFormService } from './service/open-account-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenAccountStepFirstComponent } from './component/open-account-step-first/open-account-step-first.component';
import { OpenAccountStepThirdComponent } from './component/open-account-step-third/open-account-step-third.component';
import { OpenAccountStepEndComponent } from './component/open-account-step-end/open-account-step-end.component';
import { OpenAccountStepFifthComponent } from './component/open-account-step-fifth/open-account-step-fifth.component';
import { PreOpenAccountService } from './service/pre-open-account.service';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { OpenAccountStepSecondComponent } from './component/open-account-step-second/open-account-step-second.component';
import { OpenAccountStepSummaryComponent } from './component/open-account-step-summary/open-account-step-summary.component';
import { Constants } from 'src/app/shared/service/constants';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ChannelCallbackService } from 'src/app/shared/service/channel-callback.service';
import { ExceptionDialogComponent } from 'src/app/shared/components/popup/exception-dialog/exception-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.sass']
})
export class OpenAccountComponent implements OnInit {

  constructor(
    public openAccountFormService: OpenAccountFormService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private preOpenAccountService: PreOpenAccountService,
    private openAccountService: OpenAccountService,
    public router: Router,
    private constants: Constants,
    private exceptionDialogService: ExceptionDialogService,
    private utilsService: UtilsService,
    private channelCallbackService: ChannelCallbackService,
    public dialog: MatDialog
  ) { }

  @ViewChild(OpenAccountStepFirstComponent)
  openAccountStepFirstComponent: OpenAccountStepFirstComponent;

  @ViewChild(OpenAccountStepSecondComponent)
  openAccountStepSecondComponent: OpenAccountStepSecondComponent;

  @ViewChild(OpenAccountStepThirdComponent)
  openAccountStepThirdComponent: OpenAccountStepThirdComponent;

  @ViewChild(OpenAccountStepFifthComponent)
  openAccountStepFifthComponent: OpenAccountStepFifthComponent;

  @ViewChild(OpenAccountStepEndComponent)
  openAccountStepEndComponent: OpenAccountStepEndComponent;

  @ViewChild(OpenAccountStepSummaryComponent)
  OpenAccountStepSummaryComponent: OpenAccountStepSummaryComponent;

  isLinear = true;
  panelOpenState = false;
  fatcaForm = false;
  subscriptionForm = false;
  discloseInfoForm = false;
  disableStepperForm = true;

  infoRequestOpenAccountFormGroup: FormGroup;
  requestOpenAccountFormGroup: FormGroup;
  subcriptionFormGroup: FormGroup;
  discloseInfoFormGroup: FormGroup;
  fatcaFormGroup: FormGroup;
  termAndConditionFormGroup: FormGroup;
  summaryFormGroup: FormGroup;
  formatFormAddress: any = [];
  customerData: any;
  dataList: any = [];

  openAccountPreview = {
    customerInfo: {
      name: '',
      idCard: '',
      address: '',
      dataForeigAddress: '',
      email: '',
      mobile: ''
    },
    accountInfo: {
      accountNameTH: '',
      accountNameEN: '',
      accountProduct: '',
      accountStatement: '',
      purpose: '',
      officerCode: ''
    },
    subscriptionInfo: {
      productName: '',
      email: '',
      mobile: '',
      internetBanking: ''
    }
  };

  ngOnInit() {
    this.setValueFatca();
    this.setValueSubscription();
    this.initInfoRequestOpenAccountFormGroup();
    this.initRequestOpenAccountFormGroup();
    this.initSubcriptionFormGroup();
    this.initFATCAFormGroup();
    this.initTermAndConditionFormGroup();
    this.customerData = this.preOpenAccountService.getCustomerInfomation();
    this.initialForm();
    this.openAccountStepFirstComponent.loadInitialForm(this.customerData);
  }


  onStepChange(event) {
    switch (event.selectedStep.label) {
      case 'คำขอเปิดบัญชีเงินฝาก': {
        if (!event.selectedStep.interacted) {
          this.requestOpenAccountFormGroup.patchValue({ customerTypeCtrl: this.customerData.customerProfile.custType });
          this.requestOpenAccountFormGroup.patchValue({ accountNameCtrl: this.customerData.customerProfile.customerFullNameTh });
          this.requestOpenAccountFormGroup.patchValue({ accountEngNameCtrl: this.customerData.customerProfile.customerFullNameEn });
        }
        break;
      }
      case 'สมัครบริการ': {
        if (!event.selectedStep.interacted) {
          this.setDefaultSubcriptionFormGroup();
        }
        break;
      }
      case 'การเปิดเผยข้อมูลเพิ่มเติมตามที่กฎหมายกำหนด': {
        if (!event.selectedStep.interacted) {
          this.initDiscloseInfoFormGroup();
        }
        break;
      }
      case 'FATCA': {
        if (!event.selectedStep.interacted) {
          this.openAccountStepFifthComponent.setupFormReady();
        }
        break;
      }
      case 'Term & Condition': {
        if (!event.selectedStep.interacted) {
          this.setDefaultTermAndConditionFormGroup();
        }
        break;
      }
      case 'Summary': {
        this.setOpenAccountPreview();
        this.openAccountService.openAccountInfo = this.openAccountPreview;
        this.OpenAccountStepSummaryComponent.getSummaryDetail();
        break;
      }
    }
  }

  public onSubmitOpenAccount() {
    this.openAccountService.submitOpenAccount(this.openAccountFormService.mainForm.value).subscribe(response => {
      if (response.header.success) {
        this.openAccountService.transId = response.data.transId;
        if (response.data.approvalFlg === 'Y') {
          this.setOpenAccountPreview();
          this.openAccountService.openAccountInfo = this.openAccountPreview;
          this.router.navigate(['/open-account-approve'], { relativeTo: this.route, skipLocationChange: true });
        } else {
          this.openAccountService.openAccountVerify = {
            referenceId: response.data.referenceId,
            custAuthenStatus: response.data.custAuthenStatus
          };
          this.router.navigate(['/open-account-verify'], { relativeTo: this.route, skipLocationChange: true });
        }
      } else if (response.responseStatus.responseCode === 'EAPP-E-9010') {
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

  private initInfoRequestOpenAccountFormGroup() {
    this.infoRequestOpenAccountFormGroup = this.formBuilder.group({
      customerAddressGroup: this.formBuilder.group({
        defaultFlagCtrl: [''],
        roomNumberCtrl: [''],
        floorNumberCtrl: [''],
        mooCtrl: [''],
        soiCtrl: [''],
        roadCtrl: [''],
        houseNumberCtrl: [''],
        buildingCtrl: [''],
        buildingLabelCtrl: [' '],
        subdistrictCodeCtrl: [''],
        selectSubdistrictCodeCtrl: [''],
        subdistrictDescCtrl: [''],
        districtCodeCtrl: [''],
        districtDescCtrl: [''],
        provinceCodeCtrl: [''],
        provinceDescCtrl: [''],
        postalCodeCtrl: [''],
        countryCodeCtrl: ['ไทย'],
        countryCode: ['TH'],
        checkFromAddress: ['']
      }),
      addressLineGroup: this.formBuilder.group({
        addressLineCtrl1: [''],
        addressLineCtrl2: [''],
        addressLineCtrl3: [''],
        addressLineCtrl4: [''],
        addressLineCtrl5: [''],
        addressLineCtrl6: ['']
      }),
      addressSeqCtrl: [''],
      emailSeqCtrl: [''],
      emailCtrl: [''],
      mobileSeqCtrl: [''],
      mobileCtrl: ['', Validators.pattern('[0-9]{10}')],
      addressFormatCtrl: [''],
      subdistrictCtrl: ['']
    });
  }

  private initRequestOpenAccountFormGroup() {
    this.requestOpenAccountFormGroup = this.formBuilder.group({
      customerTypeCtrl: [{ value: '', disabled: true }],
      accountTypeCtrl: [''],
      productCodeCtrl: [''],
      purposeAccountOpeningCtrl: [''],
      purposeAccountOpeningDescCtrl: [''],
      accountNameCtrl: ['', Validators.pattern('[ก-๏ ]+$')],
      accountEngNameCtrl: ['', Validators.pattern('[a-zA-Z. ]+$')],
      statementTypeCtrl: ['E'],
      officerCode: ['']
    });
  }

  private initSubcriptionFormGroup() {
    this.subcriptionFormGroup = this.formBuilder.group({
      smsCtrl: ['N'],
      phoneBankingCtrl: ['N'],
      internetBankingCtrl: ['Y'],
      refCodeEmailSeqCtrl: [''],
      refCodeEmailCtrl: [''],
      refCodeMobileSeqCtrl: [''],
      refCodeMobileCtrl: ['', Validators.pattern('[0-9]{10}')]
    });
  }

  private initDiscloseInfoFormGroup() { }

  private initFATCAFormGroup() {
    this.fatcaFormGroup = this.formBuilder.group({
      fatca1Ctrl: [''],
      fatca2Ctrl: [''],
      fatca3Ctrl: [''],
      fatca4Ctrl: [''],
      fatca5Ctrl: [''],
      fatca6Ctrl: [''],
      fatca7Ctrl: [''],
      fatca8Ctrl: [''],
      fatca9Ctrl: [''],
      fatcaVersionCtrl: [''],
    });
  }

  private initTermAndConditionFormGroup() {
    this.termAndConditionFormGroup = this.formBuilder.group({
      marketConductCtrl: [''],
      marketConductVersionCtrl: [''],
      acceptTermAndConCtrl: [''],
      acceptTermAndConVersionCtrl: [''],
      custSignCtrl: ['']
      // custSignCtrl: ['', Validators.required]
    });
  }

  private initialForm() {
    this.fatcaForm = this.isShowFATCAForm(this.customerData.customerProfile.fatcaStatus);
    this.subscriptionForm = this.isShowSubscriptionForm(this.customerData.customerProfile.internetBankingFlg);
    this.openAccountFormService.setDefault(this.customerData.refcode, this.customerData);
  }

  private isShowFATCAForm(fatcaStatus: string) {
    if ('FATCNON' === fatcaStatus || fatcaStatus === '' || fatcaStatus === null) {
      return true;
    } else {
      return false;
    }
  }

  private isShowSubscriptionForm(internetBankingFlg: String) {
    if (internetBankingFlg === 'N') {
      return true;
    } else {
      return false;
    }
  }

  private setDefaultSubcriptionFormGroup() {
    this.customerData.customerEmailList.map(email => {
      if (email.customerEmail.defaultFlg === 'Y') {
        this.openAccountStepThirdComponent.defaultEmail = email.customerEmail.contactSeq;
        this.openAccountStepThirdComponent.selectedEmail = this.openAccountStepThirdComponent.defaultEmail;
        this.subcriptionFormGroup.patchValue({ refCodeEmailSeqCtrl: this.openAccountStepThirdComponent.selectedEmail });
        this.openAccountStepThirdComponent.checkReadonlyEmailList = false;
      }
    });
    if (this.openAccountStepThirdComponent.checkReadonlyEmailList === true) {
      this.subcriptionFormGroup.patchValue({ refCodeEmailSeqCtrl: this.infoRequestOpenAccountFormGroup.value.emailSeqCtrl });
      this.subcriptionFormGroup.patchValue({ refCodeEmailCtrl: this.infoRequestOpenAccountFormGroup.value.emailCtrl });
      this.openAccountStepThirdComponent.selectedEmail = this.subcriptionFormGroup.value.refCodeEmailSeqCtrl;
    }
    this.customerData.customerMobileList.map(mobile => {
      if (mobile.customerMobile.defaultFlg === 'Y') {
        this.openAccountStepThirdComponent.defaultMobile = mobile.customerMobile.contactSeq;
        this.openAccountStepThirdComponent.selectedMobile = this.openAccountStepThirdComponent.defaultMobile;
        this.subcriptionFormGroup.patchValue({ refCodeMobileSeqCtrl: this.openAccountStepThirdComponent.selectedMobile });
        this.openAccountStepThirdComponent.checkReadonlyMobileList = false;
      }
    });
    if (this.openAccountStepThirdComponent.checkReadonlyMobileList === true) {
      this.subcriptionFormGroup.patchValue({ refCodeMobileSeqCtrl: this.infoRequestOpenAccountFormGroup.value.mobileSeqCtrl });
      this.subcriptionFormGroup.patchValue({ refCodeMobileCtrl: this.infoRequestOpenAccountFormGroup.value.mobileCtrl });
      this.openAccountStepThirdComponent.selectedMobile = this.subcriptionFormGroup.value.refCodeMobileSeqCtrl;
    }
  }

  private setDefaultTermAndConditionFormGroup() {
    this.openAccountStepEndComponent.setupFormReady();
    this.termAndConditionFormGroup.patchValue({ marketConductCtrl: '' });
    this.termAndConditionFormGroup.patchValue({ acceptTermAndConCtrl: '' });
  }

  public setOpenAccountPreview() {
    this.openAccountPreview.customerInfo.address = this.getAddressPreview();
    this.openAccountPreview.customerInfo.email = this.getCustomerEmailPreview();
    this.openAccountPreview.customerInfo.idCard = this.customerData.customerProfile.idNo;
    this.openAccountPreview.customerInfo.mobile = this.getCustomerMobilePreview();
    this.openAccountPreview.customerInfo.name = this.customerData.customerProfile.customerFullNameTh;
    this.openAccountPreview.accountInfo.accountNameEN = this.openAccountFormService.mainForm.get('openAccountDetail').value.accountEngName;
    this.openAccountPreview.accountInfo.accountNameTH = this.openAccountFormService.mainForm.get('openAccountDetail').value.accountName;
    this.openAccountPreview.accountInfo.officerCode = this.openAccountFormService.mainForm.get('openAccountDetail').value.officerCode;
    this.openAccountPreview.accountInfo.accountProduct = this.getAccountProductPreview();
    this.openAccountPreview.accountInfo.accountStatement = this.getAccountStatementPreview();
    this.openAccountPreview.accountInfo.purpose = this.getPurposePreview();
    this.openAccountPreview.subscriptionInfo.productName = this.constants.SUBSCRIPTION.KK_E_BANKING;
    if (this.subscriptionForm) {
      this.openAccountPreview.subscriptionInfo.email = this.getSubscriptionEmailPreview();
      this.openAccountPreview.subscriptionInfo.mobile = this.getSubscriptionMobilePreview();
    } else {
      this.openAccountPreview.subscriptionInfo.email = '';
      this.openAccountPreview.subscriptionInfo.mobile = '';
    }
    this.openAccountPreview.subscriptionInfo.internetBanking = this.openAccountFormService.mainForm.get('subscription').value.internetBanking;
  }

  private getAddressPreview() {
    const addressTypeSelect = this.openAccountFormService.mainForm.get('customerProfile').get('customerAddress').value.addressFormat;
    const addressSeq = this.openAccountFormService.mainForm.get('customerProfile').get('customerAddress').value.addressSeq;
    if (addressSeq) {
      return this.openAccountStepFirstComponent.addressGroups.map(data => {
        return data.address;
      })
        .filter(address => address.seq === addressSeq)
        .map(address => address.fullAddress);
    } else if (addressTypeSelect !== 'F') {
      const address = this.openAccountFormService.mainForm.get('customerProfile').get('customerAddress').value;
      return address.houseNumber + ' '
        + address.mooLabel + ' '
        + address.moo + ' '
        + (address.floorNumber !== '' ? address.floorLabel + ' ' + address.floorNumber + ' ' : '')
        + (address.roomNumber !== '' ? address.roomLabel + ' ' + address.roomNumber + ' ' : '')
        + address.building + ' '
        + (address.soi !== '' ? address.soiLabel + address.soi + ' ' : '')
        + (address.road !== '' ? address.roadLabel + address.road + ' ' : '')
        + address.subdistrictLabel + this.openAccountStepFirstComponent.subdistrictList.find(sub => sub.value === address.subdistrictCode).viewValue + ' '
        + address.districtLabel + this.openAccountStepFirstComponent.districtList.find(dist => dist.value === address.districtCode).viewValue + ' '
        + address.provinceLabel + this.openAccountStepFirstComponent.provinceList.find(prov => prov.value === address.provinceCode).viewValue + ' '
        + address.postalCode;
    } else {
      const dataForeigAddress = this.openAccountFormService.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value;
      const addressLocal = this.openAccountFormService.mainForm.get('customerProfile').get('customerAddress').value.countryCode;
      return dataForeigAddress.addressLine1 + ' '
        + dataForeigAddress.addressLine2 + ' '
        + dataForeigAddress.addressLine3 + ' '
        + dataForeigAddress.addressLine4 + ' '
        + dataForeigAddress.addressLine5 + ' '
        + dataForeigAddress.addressLine6 + ' '
        + addressLocal;
    }
  }

  private getCustomerEmailPreview() {
    const emailSeq = this.openAccountFormService.mainForm.get('customerProfile').value.customerEmailSeq;
    if (emailSeq) {
      return this.openAccountStepFirstComponent.emailList.find(emails => emails.value === emailSeq).viewValue;
    } else {
      return this.openAccountFormService.mainForm.get('customerProfile').value.customerEmail;
    }
  }

  private getCustomerMobilePreview() {
    const mobileSeq = this.openAccountFormService.mainForm.get('customerProfile').value.customerMobileSeq;
    if (mobileSeq) {
      return this.openAccountStepFirstComponent.mobileList.find(mobiles => mobiles.value === mobileSeq).viewValue;
    } else {
      return this.openAccountFormService.mainForm.get('customerProfile').value.customerMobile;
    }
  }

  private getSubscriptionEmailPreview() {
    const emailSeq = this.openAccountFormService.mainForm.get('subscription').value.refCodeEmailSeq;
    if (emailSeq) {
      return this.openAccountStepThirdComponent.emailList.find(emails => emails.value === emailSeq).viewValue;
    } else {
      return this.openAccountFormService.mainForm.get('subscription').value.refCodeEmail;
    }
  }

  private getSubscriptionMobilePreview() {
    const mobileSeq = this.openAccountFormService.mainForm.get('subscription').value.refCodeMobileSeq;
    if (mobileSeq) {
      return this.openAccountStepThirdComponent.mobileList.find(mobiles => mobiles.value === mobileSeq).viewValue;
    } else {
      return this.openAccountFormService.mainForm.get('subscription').value.refCodeMobile;
    }
  }
  //========================================== Chang Product Type To Product Name ==================================
  // private getAccountProductPreview() {
  //   let productValue = this.openAccountFormService.mainForm.get('openAccountDetail').value.accountType;
  //   return this.openAccountStepSecondComponent.productTypes.find(productTypeValue => productTypeValue.value === productValue).viewValue;
  // }

  private getAccountProductPreview() {
    let productValue = this.openAccountFormService.mainForm.get('openAccountDetail').value.accountType;
    if (productValue === 'T') { return this.openAccountStepSecondComponent.productTypes.find(productTypeValue => productTypeValue.value === productValue).viewValue }
    let productDetailsValue = this.openAccountFormService.mainForm.get('openAccountDetail').value.productCode;
    return this.openAccountStepSecondComponent.productDetails.find(productCodeValue => productCodeValue.value === productDetailsValue).viewValue;
  }
  private getAccountStatementPreview() {
    let stateMentValue = this.openAccountFormService.mainForm.get('openAccountDetail').value.statementType;
    return this.openAccountStepSecondComponent.statementTypes.find(statementTypeValue => statementTypeValue.value === stateMentValue).viewValue;
  }

  private getPurposePreview() {
    let purposesValue = this.openAccountFormService.mainForm.get('openAccountDetail').value.purposeAccountOpening;
    if (purposesValue === '99') { return this.openAccountFormService.mainForm.get('openAccountDetail').value.purposeAccountOpeningDesc }
    return this.openAccountStepSecondComponent.purposes.find(purposes => purposes.value === purposesValue).viewValue;
  }

  private checkUnacceptedTermAndConFromHeaderStatus(status: boolean) {
    if (!status) {
      window.location.href = this.utilsService.initCallbackURL();
    }
  }

  disableStepper() {
    this.disableStepperForm = false;
  }
  setValueFatca() {
    this.openAccountFormService.mainForm.get('fatca').value.fatca1 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca2 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca3 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca4 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca5 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca7 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca6 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca8 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatca9 = '';
    this.openAccountFormService.mainForm.get('fatca').value.fatcaVersion = '';
  }
  setValueSubscription() {
    this.openAccountFormService.mainForm.get('subscription').value.sms = '';
    this.openAccountFormService.mainForm.get('subscription').value.phoneBanking = '';
    this.openAccountFormService.mainForm.get('subscription').value.internetBanking = 'N';
    this.openAccountFormService.mainForm.get('subscription').value.refCodeEmailSeq = '';
    this.openAccountFormService.mainForm.get('subscription').value.refCodeEmail = '';
    this.openAccountFormService.mainForm.get('subscription').value.refCodeMobileSeq = '';
    this.openAccountFormService.mainForm.get('subscription').value.refCodeMobile = '';
  }
}
