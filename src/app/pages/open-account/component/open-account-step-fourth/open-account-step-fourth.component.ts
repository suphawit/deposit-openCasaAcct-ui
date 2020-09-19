import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-open-account-step-fourth',
  templateUrl: './open-account-step-fourth.component.html',
  styleUrls: ['./open-account-step-fourth.component.sass']
})
export class OpenAccountStepFourthComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) {}
  @Input()
  discloseInfoFormGroup: FormGroup;

  ngOnInit() {
    this.discloseInfoFormGroup = this._formBuilder.group({
      discloseInfoCtrl: new FormControl()
    });
  }

}
