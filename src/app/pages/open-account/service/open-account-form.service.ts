import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { isUndefined } from 'util';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable()
export class OpenAccountFormService {

  private stepFirstSource: Subject<FormGroup> = new Subject();
  private stepSecondSource: Subject<FormGroup> = new Subject();
  private stepThirdSource: Subject<FormGroup> = new Subject();
  private stepFourthSource: Subject<FormGroup> = new Subject();
  private stepFifthSource: Subject<FormGroup> = new Subject();
  private stepEndSource: Subject<FormGroup> = new Subject();

  stepFirst: Observable<FormGroup> = this.stepFirstSource.asObservable();
  stepSecond: Observable<FormGroup> = this.stepSecondSource.asObservable();
  stepThird: Observable<FormGroup> = this.stepThirdSource.asObservable();
  stepFourth: Observable<FormGroup> = this.stepFourthSource.asObservable();
  stepFifth: Observable<FormGroup> = this.stepFifthSource.asObservable();
  stepEnd: Observable<FormGroup> = this.stepEndSource.asObservable();

  mainForm: FormGroup = this.formBuilder.group({
    customerProfile: this.formBuilder.group({
      customerRef: [''],
      customerNumber: [''],
      custType: [''],
      customerEmail: [''],
      customerEmailSeq: [''],
      customerMobile: [''],
      customerMobileSeq: [''],
      countryOfCitizenship: [''],
      titleTh: [''],
      titleEn: [''],
      idNo: [''],
      firstNameTh: [''],
      lastNameTh: [''],
      firstNameEn: [''],
      lastNameEn: [''],
      idTypeCode: [''],
      customerAddress: this.formBuilder.group({
        addressSeq: [''],
        addressFormat: [''],
        defaultFlag: [''],
        roomNumber: [''],
        roomLabel: [''],
        floorNumber: [''],
        floorLabel: [''],
        moo: [''],
        mooLabel: [''],
        soi: [''],
        soiLabel: [''],
        road: [''],
        roadLabel: [''],
        houseNumber: [''],
        building: [''],
        subdistrictLabel: [''],
        subdistrictCode: [''],
        subdistrictDesc: [''],
        districtLabel: [''],
        districtCode: [''],
        districtDesc: [''],
        provinceLabel: [''],
        provinceCode: [''],
        provinceDesc: [''],
        postalCode: [''],
        countryCode: [''],
        addressLine: this.formBuilder.group({
          addressLine1: [''],
          addressLine2: [''],
          addressLine3: [''],
          addressLine4: [''],
          addressLine5: [''],
          addressLine6: ['']
        })
      }),
    }),
    openAccountDetail: this.formBuilder.group({
      // accountNo: [''],
      accountType: [''],
      branchNo: [''],
      groupType: [''],
      productCode: [''],
      productDesc: [''],
      purposeAccountOpening: [''],
      purposeAccountOpeningDesc: [''],
      accountName: [''],
      accountEngName: [''],
      statementType: [''],
      officerCode: [''],
      // openAccountStatus: [''],
      // openAccountStatusDesc: [''],
    }),
    subscription: this.formBuilder.group({
      sms: [''],
      phoneBanking: [''],
      internetBanking: ['N'],
      refCodeEmailSeq: [''],
      refCodeEmail: [''],
      refCodeMobileSeq: [''],
      refCodeMobile: ['']
    }),
    fatca: this.formBuilder.group({
      fatca1: [''],
      fatca2: [''],
      fatca3: [''],
      fatca4: [''],
      fatca5: [''],
      fatca6: [''],
      fatca7: [''],
      fatca8: [''],
      fatca9: [''],
      fatcaVersion: ['']
    }),
    signature: this.formBuilder.group({
      custSign: ['']
    }),
    marketConduct: [''],
    marketConductVersion: [''],
    acceptTermAndCon: [''],
    acceptTermAndConVersion: ['']
  });
  typeFormAddress: any = [];
  dataCustomers: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.subscriptionStepFirst();
  }

  setDefault(customerRef, customerData) {
    this.mainForm.get('customerProfile').value.customerRef = customerRef;
    this.mainForm.get('customerProfile').value.custType = customerData.customerProfile.custType;
    this.mainForm.get('customerProfile').value.customerNumber = customerData.customerProfile.customerNumber;
    this.mainForm.get('customerProfile').value.countryOfCitizenship = customerData.customerProfile.countryOfCitizenship;
    this.mainForm.get('customerProfile').value.titleTh = customerData.customerProfile.titleThDesc;
    this.mainForm.get('customerProfile').value.titleEn = customerData.customerProfile.titleEnDesc;
    this.mainForm.get('customerProfile').value.idNo = customerData.customerProfile.idNo;
    this.mainForm.get('customerProfile').value.firstNameTh = customerData.customerProfile.firstNameTh;
    this.mainForm.get('customerProfile').value.lastNameTh = customerData.customerProfile.lastNameTh;
    this.mainForm.get('customerProfile').value.firstNameEn = customerData.customerProfile.firstNameEn;
    this.mainForm.get('customerProfile').value.lastNameEn = customerData.customerProfile.lastNameEn;
    this.mainForm.get('customerProfile').value.idTypeCode = customerData.customerProfile.idType;
    this.mainForm.get('customerProfile').value.idIssueCountryCode = customerData.customerProfile.idIssueCountry;
  }







  stepReady(form: FormGroup, part: String) {
    switch (part) {
      case 'first': {
        this.stepFirstSource.next(form);
        break;
      }
      case 'second': {
        this.subscriptionStepSecond();
        this.stepSecondSource.next(form);
        break;
      }
      case 'third': {
        this.subscriptionStepThird();
        this.stepThirdSource.next(form);
        break;
      }
      case 'fourth': {
        this.subscriptionStepFourth();
        this.stepFourthSource.next(form);
        break;
      }
      case 'fifth': {
        this.subscriptionStepFifth();
        this.stepFifthSource.next(form);
        break;
      }
      case 'end': {
        this.subscriptionStepEnd();
        this.stepEndSource.next(form);
        break;
      }
    }
  }

  private concatBuilding(customerAddressGroup) {
    let buildingValue = '';
    if (customerAddressGroup.buildingLabelCtrl === null || customerAddressGroup.buildingLabelCtrl === ' ') {
      buildingValue = '';
    } else {
      buildingValue = customerAddressGroup.buildingLabelCtrl + customerAddressGroup.buildingCtrl;
    }
    return buildingValue;
  }

  private getMooLabel(customerAddressGroup) {
    return this.getLabel('หมู่', customerAddressGroup.mooCtrl);
  }

  private getFloorLabel(customerAddressGroup) {
    return this.getLabel('ชั้นที่', customerAddressGroup.floorNumberCtrl);
  }

  private getRoomLabel(customerAddressGroup) {
    return this.getLabel('ห้อง', customerAddressGroup.roomNumberCtrl);
  }

  private getSoiLabel(customerAddressGroup) {
    return this.getLabel('ซ.', customerAddressGroup.soiCtrl);
  }

  private getRoadLabel(customerAddressGroup) {
    return this.getLabel('ถ.', customerAddressGroup.roadCtrl);
  }
  private getSubdistrictDescLabel(customerAddressGroup) {
    return this.getLabel('แขวง', customerAddressGroup.subdistrictCodeCtrl);
  }
  private getDistrictDescLabel(customerAddressGroup) {
    return this.getLabel('เขต', customerAddressGroup.districtCodeCtrl);
  }
  private getSubdistrictDescLabelShort(customerAddressGroup) {
    return this.getLabel('ต.', customerAddressGroup.subdistrictCodeCtrl);
  }
  private getDistrictDescLabelShort(customerAddressGroup) {
    return this.getLabel('อ.', customerAddressGroup.districtCodeCtrl);
  }
  private getprovinceDescLabel(customerAddressGroup) {
    return this.getLabel('', customerAddressGroup.provinceCodeCtrl);

  }

  private getLabel(prefix, value) {
    return value ? prefix : '';
  }

  private subscriptionStepFirst() {
    this.stepFirst.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log('DATA FORM INPUT STEP 1:', val);
        this.mainForm.get('customerProfile').value.customerEmail = val.emailCtrl;
        this.mainForm.get('customerProfile').value.customerEmailSeq = val.emailSeqCtrl;
        this.mainForm.get('customerProfile').value.customerMobile = val.mobileCtrl;
        this.mainForm.get('customerProfile').value.customerMobileSeq = val.mobileSeqCtrl;
        this.mainForm.get('customerProfile').get('customerAddress').value.addressSeq = val.addressSeqCtrl;

        if (!isUndefined(val.customerAddressGroup)) {
          this.mainForm.get('customerProfile').get('customerAddress').value.addressFormat = (val.addressFormatCtrl.addressFormat === null || val.addressFormatCtrl.addressFormat === undefined || val.addressSeqCtrl !== '' ? '' : val.addressFormatCtrl.addressFormat);
          this.mainForm.get('customerProfile').get('customerAddress').value.defaultFlag = (val.customerAddressGroup.defaultFlagCtrl === null ? '' : val.customerAddressGroup.defaultFlagCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.roomNumber = (val.customerAddressGroup.roomNumberCtrl === null ? '' : val.customerAddressGroup.roomNumberCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.roomLabel = this.getRoomLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.floorNumber = (val.customerAddressGroup.floorNumberCtrl === null ? '' : val.customerAddressGroup.floorNumberCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.floorLabel = this.getFloorLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.moo = (val.customerAddressGroup.mooCtrl === null ? '' : val.customerAddressGroup.mooCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.mooLabel = this.getMooLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.soi = (val.customerAddressGroup.soiCtrl === null ? '' : val.customerAddressGroup.soiCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.soiLabel = this.getSoiLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.road = (val.customerAddressGroup.roadCtrl === null ? '' : val.customerAddressGroup.roadCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.roadLabel = this.getRoadLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.houseNumber = (val.customerAddressGroup.houseNumberCtrl === null || val.customerAddressGroup.houseNumberCtrl === undefined ? '' : val.customerAddressGroup.houseNumberCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.building = this.concatBuilding(val.customerAddressGroup === null || val.customerAddressGroup === undefined ? '' : val.customerAddressGroup);

          if (val.customerAddressGroup.provinceCodeCtrl === '10') {
            this.mainForm.get('customerProfile').get('customerAddress').value.subdistrictLabel = this.getSubdistrictDescLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
            this.mainForm.get('customerProfile').get('customerAddress').value.subdistrictDesc = val.customerAddressGroup.subdistrictDescCtrl === null ? '' : val.customerAddressGroup.subdistrictDescCtrl;
            this.mainForm.get('customerProfile').get('customerAddress').value.districtLabel = this.getDistrictDescLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
            this.mainForm.get('customerProfile').get('customerAddress').value.districtDesc = val.customerAddressGroup.districtDescCtrl === null ? '' : val.customerAddressGroup.districtDescCtrl;
          } else {
            this.mainForm.get('customerProfile').get('customerAddress').value.subdistrictLabel = this.getSubdistrictDescLabelShort(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
            this.mainForm.get('customerProfile').get('customerAddress').value.subdistrictDesc = val.customerAddressGroup.subdistrictDescCtrl === null ? '' : val.customerAddressGroup.subdistrictDescCtrl;
            this.mainForm.get('customerProfile').get('customerAddress').value.districtLabel = this.getDistrictDescLabelShort(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
            this.mainForm.get('customerProfile').get('customerAddress').value.districtDesc = val.customerAddressGroup.districtDescCtrl === null ? '' : val.customerAddressGroup.districtDescCtrl;
          }
          this.mainForm.get('customerProfile').get('customerAddress').value.subdistrictCode = (val.customerAddressGroup.subdistrictCodeCtrl === null || val.customerAddressGroup.subdistrictCodeCtrl === undefined ? '' : val.customerAddressGroup.subdistrictCodeCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.districtCode = (val.customerAddressGroup.districtCodeCtrl === null || val.customerAddressGroup.districtCodeCtrl === undefined ? '' : val.customerAddressGroup.districtCodeCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.provinceCode = (val.customerAddressGroup.provinceCodeCtrl === null || val.customerAddressGroup.provinceCodeCtrl === undefined ? '' : val.customerAddressGroup.provinceCodeCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.provinceLabel = this.getprovinceDescLabel(val.customerAddressGroup === null ? '' : val.customerAddressGroup);
          this.mainForm.get('customerProfile').get('customerAddress').value.provinceDesc = val.customerAddressGroup.provinceDescCtrl === null ? '' : val.customerAddressGroup.provinceDescCtrl;
          this.mainForm.get('customerProfile').get('customerAddress').value.postalCode = (val.customerAddressGroup.postalCodeCtrl === null || val.customerAddressGroup.postalCodeCtrl === undefined ? '' : val.customerAddressGroup.postalCodeCtrl);
          this.mainForm.get('customerProfile').get('customerAddress').value.countryCode = (val.customerAddressGroup.countryCode === null ? '' : val.customerAddressGroup.countryCode);
        }
        if (!isUndefined(val.addressLineGroup)) {
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine1 = (val.addressLineGroup.addressLineCtrl1 === null ? '' : val.addressLineGroup.addressLineCtrl1);
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine2 = (val.addressLineGroup.addressLineCtrl2 === null ? '' : val.addressLineGroup.addressLineCtrl2);
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine3 = (val.addressLineGroup.addressLineCtrl3 === null ? '' : val.addressLineGroup.addressLineCtrl3);
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine4 = (val.addressLineGroup.addressLineCtrl4 === null ? '' : val.addressLineGroup.addressLineCtrl4);
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine5 = (val.addressLineGroup.addressLineCtrl5 === null ? '' : val.addressLineGroup.addressLineCtrl5);
          this.mainForm.get('customerProfile').get('customerAddress').get('addressLine').value.addressLine6 = (val.addressLineGroup.addressLineCtrl6 === null ? '' : val.addressLineGroup.addressLineCtrl6);
        }
      })
    );
  }

  private subscriptionStepSecond() {
    this.stepSecond.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log('DATA STEP 2 : ', val);
        this.mainForm.get('openAccountDetail').value.accountType = val.accountTypeCtrl;
        this.mainForm.get('openAccountDetail').value.productCode = (val.productCodeCtrl === undefined || val.productCodeCtrl === null ? '' : val.productCodeCtrl);
        this.mainForm.get('openAccountDetail').value.purposeAccountOpening = val.purposeAccountOpeningCtrl;
        this.mainForm.get('openAccountDetail').value.purposeAccountOpeningDesc = (val.purposeAccountOpeningDescCtrl === undefined || val.purposeAccountOpeningDescCtrl === null ? '' : val.purposeAccountOpeningDescCtrl);
        this.mainForm.get('openAccountDetail').value.accountName = val.accountNameCtrl;
        this.mainForm.get('openAccountDetail').value.accountEngName = val.accountEngNameCtrl;
        this.mainForm.get('openAccountDetail').value.officerCode = val.officerCode.toUpperCase();
        if (val.accountTypeCtrl === 'T') {
          this.mainForm.get('openAccountDetail').value.statementType = 'P';
          this.mainForm.get('openAccountDetail').value.groupType = 'FD';
        } else if (val.accountTypeCtrl === 'D') {
          // this.mainForm.get('openAccountDetail').value.statementType = 'C';
          this.mainForm.get('openAccountDetail').value.statementType = 'E';
        } else {
          this.mainForm.get('openAccountDetail').value.statementType = val.statementTypeCtrl;
        }
      })
    );
  }

  private subscriptionStepThird() {
    this.stepThird.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log('DATA STEP 3', val);
        this.mainForm.get('subscription').value.sms = val.smsCtrl;
        this.mainForm.get('subscription').value.phoneBanking = val.phoneBankingCtrl;
        this.mainForm.get('subscription').value.internetBanking = (val.internetBankingCtrl === '' || val.internetBankingCtrl === null ? 'N' : val.internetBankingCtrl);
        this.mainForm.get('subscription').value.refCodeEmailSeq = val.refCodeEmailSeqCtrl;
        this.mainForm.get('subscription').value.refCodeEmail = val.refCodeEmailCtrl;
        this.mainForm.get('subscription').value.refCodeMobileSeq = val.refCodeMobileSeqCtrl;
        this.mainForm.get('subscription').value.refCodeMobile = val.refCodeMobileCtrl;
      })
    );
  }

  private subscriptionStepFourth() {
    this.stepFourth.subscribe(form =>
      form.valueChanges.subscribe(val => {
        console.log(val);
      })
    );
  }

  private subscriptionStepFifth() {
    this.stepFifth.subscribe(form =>
      form.valueChanges.subscribe(val => {
        //  console.log('DATA STEP FETCA', val);
        this.mainForm.get('fatca').value.fatca1 = val.fatca1Ctrl;
        this.mainForm.get('fatca').value.fatca2 = val.fatca2Ctrl;
        this.mainForm.get('fatca').value.fatca3 = val.fatca3Ctrl;
        this.mainForm.get('fatca').value.fatca4 = val.fatca4Ctrl;
        this.mainForm.get('fatca').value.fatca5 = val.fatca5Ctrl;
        this.mainForm.get('fatca').value.fatca6 = val.fatca6Ctrl;
        this.mainForm.get('fatca').value.fatca7 = val.fatca7Ctrl;
        this.mainForm.get('fatca').value.fatca8 = val.fatca8Ctrl;
        this.mainForm.get('fatca').value.fatca9 = val.fatca9Ctrl;
        this.mainForm.get('fatca').value.fatcaVersion = val.fatcaVersionCtrl;
      })
    );
  }

  private subscriptionStepEnd() {
    this.stepEnd.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log('DATA STEP END', val);
        // this.mainForm.value.marketConduct = val.marketConductCtrl;
        this.mainForm.value.acceptTermAndCon = val.acceptTermAndConCtrl;
        this.mainForm.value.marketConductVersion = val.marketConductVersionCtrl;
        this.mainForm.value.acceptTermAndConVersion = val.acceptTermAndConVersionCtrl;
        this.mainForm.get('signature').value.custSign = val.custSignCtrl;
      })
    );
  }
}
