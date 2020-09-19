import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';

@Component({
  selector: 'app-open-account-step-third',
  templateUrl: './open-account-step-third.component.html',
  styleUrls: ['./open-account-step-third.component.sass']
})
export class OpenAccountStepThirdComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private openAccountFormService: OpenAccountFormService
  ) { }

  @Input()
  subcriptionFormGroup: FormGroup;

  @Input()
  customerData: any;

  selectedEmail: string;
  selectedMobile: string;
  checkEmailList = false;
  checkMobileList = false;
  emailList: any = [];
  mobileList: any = [];
  checkReadonlyEmailList: any;
  checkReadonlyMobileList: any;
  defaultEmail: string;
  defaultMobile: string;

  ngOnInit() {
    this.openAccountFormService.stepReady(this.subcriptionFormGroup, 'third');
    this.emailList = this.getEmailList();
    this.mobileList = this.getMobileList();
    this.appendDefaultDDL(this.emailList);
    this.appendDefaultDDL(this.mobileList);
  }

  private getEmailList() {
    return this.customerData.customerEmailList.map(email => {
      return Object.assign({}, {
        value: email.customerEmail.contactSeq,
        viewValue: email.customerEmail.contactDetail
      });
    });
  }

  private getMobileList() {
    return this.customerData.customerMobileList.map(mobile => {
      return Object.assign({}, {
        value: mobile.customerMobile.contactSeq,
        viewValue: mobile.customerMobile.contactDetail
      });
    });
  }

  private appendDefaultDDL(ddl) {
    return ddl.push({
      value: '',
      viewValue: 'อื่นๆ'
    });
  }

  changeEmail(value) {
    if (value) {
      this.checkEmailList = false;
      this.subcriptionFormGroup.get('refCodeEmailCtrl').reset();
      this.subcriptionFormGroup.get('refCodeEmailCtrl').disable();
    } else {
      this.checkEmailList = false;
      this.subcriptionFormGroup.get('refCodeEmailCtrl').reset();
      this.subcriptionFormGroup.get('refCodeEmailCtrl').enable();
    }
  }

  changeMobile(value) {
    if (value) {
      this.checkMobileList = false;
      this.subcriptionFormGroup.get('refCodeMobileCtrl').reset();
      this.subcriptionFormGroup.get('refCodeMobileCtrl').disable();
    } else {
      this.checkMobileList = false;
      this.subcriptionFormGroup.get('refCodeMobileCtrl').reset();
      this.subcriptionFormGroup.get('refCodeMobileCtrl').enable();
    }
  }
  // CHECK LIST DATA FOR LOOP IN ADDRESS && E-MAIL && MOBILE
  change() {
    if (this.emailList.find(mail => mail.viewValue === this.subcriptionFormGroup.get('refCodeEmailCtrl').value)) {
      this.checkEmailList = true;
    } else {
      this.checkEmailList = false;
    }

    if (this.mobileList.find(mobile => mobile.viewValue === this.subcriptionFormGroup.get('refCodeMobileCtrl').value)) {
      this.checkMobileList = true;
    } else {
      this.checkMobileList = false;
    }
  }
}
