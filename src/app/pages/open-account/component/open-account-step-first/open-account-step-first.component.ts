import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service.js';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { HttpErrorResponse } from '@angular/common/http';

const btnAddAddress = 'เพิ่มสถานที่ติดต่อทางไปรษณีย์อื่นๆ';
const btnCancelAddress = 'ยกเลิกเพิ่มสถานที่ติดต่อทางไปรษณีย์อื่นๆ';

@Component({
  selector: 'app-open-account-step-first',
  templateUrl: './open-account-step-first.component.html',
  styleUrls: ['./open-account-step-first.component.sass']
})
export class OpenAccountStepFirstComponent implements OnInit {

  constructor(
    private openAccountFormService: OpenAccountFormService,
    private masterDataService: MasterDataService,
    private exceptionDialogService: ExceptionDialogService,
    private openAccountService: OpenAccountService,
  ) { }

  customerData: any;

  @Input()
  infoRequestOpenAccountFormGroup: FormGroup;
  fatcaFormGroup: FormGroup;
  addressGroups: any = [];
  emailList: any = [];
  mobileList: any = [];
  countryTypes: any = [];
  resultChangPostal: any = [];
  provinceList: any = [];
  districtList: any = [];
  subdistrictList: any = [];
  fullAddressType_M: any = [];
  addressSeq: any = [];
  countryList: any = [];
  dataAddressList: any = [];
  dataFullAddress: any;

  private defaultAddress: string;
  private defaultEmail: string;
  private defaultMobile: string;
  selectedAddress: string;
  selectedEmail: string;
  selectedMobile: string;
  selectedProvince: string;
  selectedDistrict: string;
  selectedSubdistrict: string;
  checkAddessFormat: string;
  selectedcountryTypes: string;

  checkAddressList = false;
  checkEmailList = false;
  checkMobileList = false;
  required = false;
  openAccountInfos;
  btnAddAddressView = btnAddAddress;

  buildingList: any = [
    { value: 'หมู่บ้าน', viewValue: 'หมู่บ้าน' },
    { value: 'อาคาร', viewValue: 'อาคาร' },
    { value: 'โรงเรียน', viewValue: 'โรงเรียน' },
    { value: 'วัด', viewValue: 'วัด' },
    { value: ' ', viewValue: 'ไม่ระบุ' }
  ];
  addressFormats: any = [
    { value: 'L', viewValue: 'L-Local Address' },
    { value: 'F', viewValue: 'F-Foreign Address' }
  ];

  ngOnInit() {
    this.openAccountFormService.stepReady(this.infoRequestOpenAccountFormGroup, 'first');
    this.initDefaultDDL();
    this.getCountryList();
    this.changAddressFormat('L');
    if (this.defaultAddress === '' || this.defaultAddress === undefined) {
      this.openCloseAddressPanel(true);
    }
    this.setFullAddress();
  }

  loadInitialForm(data) {
    this.customerData = data;
    this.openAccountInfos = [
      { text: 'ชื่อ-นามสกุล', cols: 1, rows: 1, color: '' },
      { text: this.customerData.customerProfile.customerFullNameTh, cols: 1, rows: 1, color: '' },
      { text: 'เลขประจำตัวประชาชน/เลขหนังสือเดินทาง', cols: 2, rows: 1, color: '' },
      { text: this.customerData.customerProfile.idNo, cols: 1, rows: 1, color: '' },
      { text: '(\"ลูกค้า\"หรือ\"ผู้ขอใช้บริการ\")', cols: 1, rows: 1, color: '' },
      { text: 'English Name', cols: 1, rows: 1, color: '' },
      { text: this.customerData.customerProfile.customerFullNameEn, cols: 2, rows: 1, color: 'color' }
    ];
  }

  changeAddress(value: string) {
    this.openCloseAddressPanel(!value);
  }

  openAddressPanel(value: string) {
    if (this.defaultAddress === undefined) {
      this.checkAddressList = false;
      this.selectedAddress = '';
      this.changAddressFormat('L');
      this.openCloseAddressPanel(true);
      this.infoRequestOpenAccountFormGroup.patchValue({ addressSeqCtrl: this.selectedAddress });
    } else {
      if (!value) {
        this.checkAddressList = false;
        this.selectedAddress = this.defaultAddress;
        this.changAddressFormat('L');
        this.openCloseAddressPanel(false);
        this.infoRequestOpenAccountFormGroup.patchValue({ addressSeqCtrl: this.selectedAddress });
      } else {
        this.checkAddressList = false;
        this.selectedAddress = '';
        this.changAddressFormat('L');
        this.openCloseAddressPanel(true);
        this.infoRequestOpenAccountFormGroup.patchValue({ addressSeqCtrl: this.selectedAddress });
      }
    }
  }

  changePostal(value) {
    if (value.length === 5) {
      this.masterDataService.getAddressByPostal(value).subscribe(data => {
        if (data.provinceList === null || data.provinceList === undefined) {
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('provinceCodeCtrl').reset();
          this.masterDataService.getProvinceList().subscribe(provinces => {
            this.provinceList = provinces
              .filter(p => p.provinceCode !== '99')
              .map(p => this.transformCommonDDL(p.provinceCode, p.longDescLocal));
          }, error => {
            this.exceptionDialogService.openDialogError();
            console.log(error);
          });
        } else {
          this.selectedProvince = data.provinceList[0].provinceCode;
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({ provinceCodeCtrl: this.selectedProvince });
        }
        if (data.districtList === null || data.districtList === undefined) {
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('districtCodeCtrl').reset();
        } else {
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('districtCodeCtrl').reset();
          this.districtList = data.districtList.map(dist => {
            if (data.districtList.length === 1) {
              this.selectedDistrict = dist.districtCode;
              this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').enable();
              this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({ districtCodeCtrl: this.selectedDistrict });
            }
            return this.transformCommonDDL(dist.districtCode, dist.longDescLocal);
          });
        }

        if (data.subdistrictList === null || data.subdistrictList === undefined) {
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').reset();
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').reset();
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('postalCodeCtrl').reset();
        } else {
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').reset();
          this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').reset();
          this.subdistrictList = data.subdistrictList.map(subdist => {
            if (data.subdistrictList.length === 1) {
              this.selectedSubdistrict = subdist.subdistrictCode;
              this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({ subdistrictCodeCtrl: this.selectedSubdistrict });
            }
            return this.transformSubdistrictDDL(subdist.subdistrictCode, subdist.longDescLocal, subdist.postalCode);
          });
        }
      }, error => {
        this.exceptionDialogService.openDialogError();
        console.log(error);
      });
    }
  }

  changeProvince() {
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('districtCodeCtrl').reset();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').reset();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').reset();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').disable();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('postalCodeCtrl').reset();
    this.masterDataService.getDistrictByProvince(this.selectedProvince).subscribe(district => {
      this.districtList = district.map(dist => this.transformCommonDDL(dist.districtCode, dist.longDescLocal));
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }

  changeDistrict() {
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').reset();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').reset();
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').enable();
    this.masterDataService.getSubdistrictByProvinceAndDistrict(this.selectedProvince, this.selectedDistrict).subscribe(subdistrict => {
      this.subdistrictList = subdistrict.map(subdist => {
        return this.transformSubdistrictDDL(subdist.subdistrictCode, subdist.longDescLocal, subdist.postalCode);
      });
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }

  changeSubDistrict() {
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({
      postalCodeCtrl: this.subdistrictList.filter(subdistrict => subdistrict.value + subdistrict.postalCode === this.selectedSubdistrict)[0].postalCode
    });
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({
      subdistrictCodeCtrl: this.subdistrictList.filter(subdistrict => subdistrict.value + subdistrict.postalCode === this.selectedSubdistrict)[0].value
    });
  }

  changeEmail(value) {
    if (value) {
      this.checkEmailList = false;
      this.infoRequestOpenAccountFormGroup.get('emailCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('emailCtrl').disable();
    } else {
      this.checkEmailList = false;
      this.infoRequestOpenAccountFormGroup.get('emailCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('emailCtrl').enable();
    }
  }

  changeMobile(value) {
    if (value) {
      this.checkMobileList = false;
      this.infoRequestOpenAccountFormGroup.get('mobileCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('mobileCtrl').disable();
    } else {
      this.checkMobileList = false;
      this.infoRequestOpenAccountFormGroup.get('mobileCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('mobileCtrl').enable();
    }
  }

  chengeBuilding(value) {
    if (value !== ' ') {
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').enable();
    } else {
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').reset();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').disable();
    }
  }

  private openCloseAddressPanel(isOpen: boolean) {
    // console.log('IS OPEN : ', isOpen);
    if (isOpen) {
      this.checkAddressList = false;
      this.btnAddAddressView = btnCancelAddress;
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').enable();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').enable();
      this.masterDataService.getProvinceList().subscribe(provinces => {
        this.provinceList = provinces
          .filter(p => p.provinceCode !== '99')
          .map(p => this.transformCommonDDL(p.provinceCode, p.longDescLocal));
      }, error => {
        this.exceptionDialogService.openDialogError();
        console.log(error);
      });
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').disable();
    } else {
      this.checkAddressList = false;
      this.btnAddAddressView = btnAddAddress;
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').reset();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').reset();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingLabelCtrl').setValue(' ');
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').disable();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').disable();
      this.provinceList = [];
    }
  }

  private getAddressFullList() {
    this.dataAddressList = this.customerData.customerAddressList;
    return this.customerData.customerAddressList.map(address => {
      if (address.customerAddress.defaultFlag === 'Y') {
        this.defaultAddress = address.customerAddress.addressSeq;
        this.selectedAddress = this.defaultAddress;
        this.infoRequestOpenAccountFormGroup.patchValue({ addressSeqCtrl: this.selectedAddress });
      }
      this.addressSeq = address.customerAddress.addressSeq;
      this.fullAddressType_M = address.customerAddress.addressFull;
      return Object.assign({}, {
        groupName: address.customerAddress.addressSeq + ' ' + address.customerAddress.addressTypeDesc,
        address: {
          seq: this.addressSeq,
          fullAddress: this.fullAddressType_M
        },
        selected: false
      });
    });
  }

  private appendDefaultAddress() {
    return this.addressGroups.push({
      groupName: 'สถานที่ติดต่อทางไปรษณีย์อื่นๆ',
      address: {
        seq: '',
        fullAddress: 'เพิ่มสถานที่ติดต่อทางไปรษณีย์อื่นๆ'
      },
      selected: false
    });
  }

  private getEmailList() {
    return this.customerData.customerEmailList.map(email => {
      if (email.customerEmail.defaultFlg === 'Y') {
        this.defaultEmail = email.customerEmail.contactSeq;
        this.selectedEmail = this.defaultEmail;
        this.infoRequestOpenAccountFormGroup.patchValue({ emailSeqCtrl: this.selectedEmail });
      }
      if (this.selectedEmail === '' || this.selectedEmail === undefined || this.selectedEmail === null) {
        this.infoRequestOpenAccountFormGroup.patchValue({ emailSeqCtrl: '' });
      }
      return Object.assign({}, {
        value: email.customerEmail.contactSeq,
        viewValue: email.customerEmail.contactDetail
      });
    });
  }

  private appendDefaultDDL(ddl) {
    return ddl.push({
      value: '',
      viewValue: 'อื่นๆ'
    });
  }

  private getMobileList() {
    return this.customerData.customerMobileList.map(mobile => {
      if (mobile.customerMobile.defaultFlg === 'Y') {
        this.defaultMobile = mobile.customerMobile.contactSeq;
        this.selectedMobile = this.defaultMobile;
        this.infoRequestOpenAccountFormGroup.patchValue({ mobileSeqCtrl: this.selectedMobile });
      }
      if (this.selectedMobile === '' || this.selectedMobile === undefined || this.selectedMobile === null) {
        this.infoRequestOpenAccountFormGroup.patchValue({ mobileSeqCtrl: '' });
      }
      return Object.assign({}, {
        value: mobile.customerMobile.contactSeq,
        viewValue: mobile.customerMobile.contactDetail
      });
    });
  }

  private transformCommonDDL(val: any, viewVal: any) {
    return Object.assign({}, {
      value: val,
      viewValue: viewVal
    });
  }

  private transformSubdistrictDDL(subdistrictCode: any, subdistrictDesc: any, postal: any) {
    const dll = this.transformCommonDDL(subdistrictCode, subdistrictDesc);
    return Object.assign(dll, {
      postalCode: postal
    });
  }

  private initDefaultDDL() {
    this.addressGroups = this.getAddressFullList();
    this.appendDefaultAddress();
    this.emailList = this.getEmailList();
    this.mobileList = this.getMobileList();
    this.appendDefaultDDL(this.emailList);
    this.appendDefaultDDL(this.mobileList);
  }

  changAddressFormat(data) {
    if (data === 'L') {
      this.checkAddessFormat = data;
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').reset();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingLabelCtrl').setValue(' ');
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('countryCodeCtrl').setValue('ไทย');
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('countryCode').setValue('TH');
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').enable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('addressFormatCtrl').patchValue({
        addressFormat: this.addressFormats.filter(addressFormat => addressFormat.value === this.checkAddessFormat)[0].value
      });
    } else {
      this.checkAddessFormat = data;
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').reset();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('houseNumberCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('postalCodeCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('provinceCodeCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('districtCodeCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('selectSubdistrictCodeCtrl').disable();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').reset();
      this.infoRequestOpenAccountFormGroup.get('addressLineGroup').enable();
      this.infoRequestOpenAccountFormGroup.get('addressFormatCtrl').patchValue({
        addressFormat: this.addressFormats.filter(addressFormat => addressFormat.value === this.checkAddessFormat)[0].value
      });
    }
  }

  changeCountryType() {
    this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').patchValue({
      countryType: this.countryTypes.filter(countrytype => countrytype.value === this.selectedcountryTypes)
    });
  }
  getCountryList() {
    this.masterDataService.getCountryList().subscribe(countrys => {
      this.countryList = countrys.filter(country => country.countryCode !== 'TH')
        .map(contry => this.transformCommonDDL(contry.countryCode, contry.countryCode + ' - ' + contry.longDescEn));
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }

  // CHECK LIST DATA FOR LOOP IN ADDRESS && E-MAIL && MOBILE
  change() {
    const buildinglabel = (this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingLabelCtrl').value === ' ' ? '' : this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingLabelCtrl').value);
    const buildingCtrl = (buildinglabel === '' ? '' : this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('buildingCtrl').value);
    const vlueData = this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('houseNumberCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('mooCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('floorNumberCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('roomNumberCtrl').value
      + '|' + buildinglabel + buildingCtrl
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('soiCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('roadCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('subdistrictCodeCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('districtCodeCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('provinceCodeCtrl').value
      + '|' + this.infoRequestOpenAccountFormGroup.get('customerAddressGroup').get('postalCodeCtrl').value;

    if (this.dataFullAddress.find(checkData => checkData[0].FullAddress === vlueData)) {
      this.checkAddressList = true;
    } else {
      this.checkAddressList = false;
    }

    if (this.emailList.find(mail => mail.viewValue === this.infoRequestOpenAccountFormGroup.get('emailCtrl').value)) {
      this.checkEmailList = true;
    } else {
      this.checkEmailList = false;
    }

    if (this.mobileList.find(mobile => mobile.viewValue === this.infoRequestOpenAccountFormGroup.get('mobileCtrl').value)) {
      this.checkMobileList = true;
    } else {
      this.checkMobileList = false;
    }
  }
  // SET CONCAT FULL ADDRESS FOR CHECK ADDRESS LOOP
  setFullAddress() {
    this.dataFullAddress = this.dataAddressList.map(data => {
      const dataList: any = [{
        FullAddress: data.customerAddress.houseNumber
          + '|' + data.customerAddress.moo
          + '|' + data.customerAddress.floorNumber
          + '|' + data.customerAddress.roomNumber
          + '|' + data.customerAddress.building
          + '|' + data.customerAddress.soi
          + '|' + data.customerAddress.road
          + '|' + data.customerAddress.subdistrictCode
          + '|' + data.customerAddress.districtCode
          + '|' + data.customerAddress.provinceCode
          + '|' + data.customerAddress.postalCode
      }];
      return dataList;
    });
  }
}
