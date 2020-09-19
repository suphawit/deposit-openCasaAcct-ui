import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OpenAccountFormService } from '../../service/open-account-form.service';
import { MasterDataService } from 'src/app/shared/service/master-data.service.js';

@Component({
  selector: 'app-open-account-step-fifth',
  templateUrl: './open-account-step-fifth.component.html',
  styleUrls: ['./open-account-step-fifth.component.sass']
})
export class OpenAccountStepFifthComponent implements OnInit {

  constructor(private openAccountFormService: OpenAccountFormService, private masterDataService: MasterDataService) { }

  @Input()
  fatcaFormGroup: FormGroup;
  fatcaContents: any = [];
  fatcaType = 'FATCA';
  ngOnInit() {
    this.getFatcaContent();
  }

  setupFormReady() {
    this.openAccountFormService.stepReady(this.fatcaFormGroup, 'fifth');
  }

  getFatcaContent() {
    this.masterDataService.getContent(this.fatcaType).subscribe(dataFatca => {
      if (dataFatca.header.success) {
        this.fatcaContents = dataFatca.data.contentList.map(res => {
          return res;
        });
        this.fatcaFormGroup.patchValue({ fatcaVersionCtrl: dataFatca.data.contentVersion });
      } else {
        this.fatcaContents = 'DATA NOT FOUND';
      }
    });
  }
}
