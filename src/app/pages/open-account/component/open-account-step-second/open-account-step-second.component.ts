import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { ExceptionDialogService } from 'src/app/shared/service/exception-dialog.service';

@Component({
  selector: 'app-open-account-step-second',
  templateUrl: './open-account-step-second.component.html',
  styleUrls: ['./open-account-step-second.component.sass']
})
export class OpenAccountStepSecondComponent implements OnInit {

  constructor(
    private openAccountFormService: OpenAccountFormService,
    private masterDataService: MasterDataService,
    private utilsService: UtilsService,
    private exceptionDialogService: ExceptionDialogService
  ) { }

  @Input()
  requestOpenAccountFormGroup: FormGroup;

  @Input()
  customerData: any;
  Checkvalue: String;
  curCode: String;
  cusType: String;
  productTypes: any = [];
  productDetails: any = [];
  purposes: any = [];

  customerTypes: any = [
    {
      value: 'N',
      viewValue: 'ลูกค้าใหม่/New'
    },
    {
      value: 'E',
      viewValue: 'ลูกค้าปัจจุบัน/Existing'
    }
  ];

  statementTypes: any = [
    {
      // value: 'C',
      value: 'E',
      viewValue: 'E-Account'
    }, {
      value: 'P',
      viewValue: 'สมุดคู่ฝาก/Passbook'
    }
  ];
  public checkForm: boolean = true;
  dataChangPurpose: String;

  ngOnInit() {
    this.openAccountFormService.stepReady(this.requestOpenAccountFormGroup, 'second');
    this.masterDataService.getProductTypes().subscribe(productTypes => {
      this.productTypes = productTypes.map(data => {
        return this.utilsService.transformCommonDDL(data.productType, data.productDesc);
      });
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });

    this.masterDataService.getPurposeOpenAccountList().subscribe(configList => {
      this.purposes = configList
        .map(config => {
          return this.utilsService.transformCommonDDL(config.refValue, config.longThDesc);
        });
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }

  changeProductType(value) {
    if (value === 'T') {
      this.requestOpenAccountFormGroup.get('productCodeCtrl').reset();
      this.requestOpenAccountFormGroup.get('productCodeCtrl').disable();
      this.requestOpenAccountFormGroup.get('statementTypeCtrl').setValue('P');
      this.requestOpenAccountFormGroup.get('statementTypeCtrl').disable();
      return this.checkForm = false
    }
    this.checkForm = true
    this.requestOpenAccountFormGroup.get('statementTypeCtrl').reset();
    // this.requestOpenAccountFormGroup.get('statementTypeCtrl').setValue('C')
    this.requestOpenAccountFormGroup.get('statementTypeCtrl').setValue('E')
    if (value === 'D') {
      this.requestOpenAccountFormGroup.get('statementTypeCtrl').disable();
    } else {
      this.requestOpenAccountFormGroup.get('statementTypeCtrl').enable();
    }
    this.requestOpenAccountFormGroup.get('productCodeCtrl').enable();
    this.masterDataService.getProductDetailByType(value).subscribe(productList => {
      this.requestOpenAccountFormGroup.patchValue({ productCodeCtrl: '' });
      this.productDetails = productList.map(product => {
        return this.utilsService.transformCommonDDL(product.productCode, product.productNameEN);
      });
    }, error => {
      this.exceptionDialogService.openDialogError();
      console.log(error);
    });
  }

  changPurpose(data) {
    if (data === '99') {
      this.requestOpenAccountFormGroup.get('purposeAccountOpeningDescCtrl').enable();
      return this.dataChangPurpose = data;
    }
    this.requestOpenAccountFormGroup.get('purposeAccountOpeningDescCtrl').disable();
    this.dataChangPurpose = data;
  }
}
