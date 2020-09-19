import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-open-account-summary',
    templateUrl: './open-account-summary.component.html',
    styleUrls: ['./open-account-summary.component.sass']
  })
  export class OpenAccountSummaryComponent implements OnInit {
    openAccountInfos;

    ngOnInit(): void {}
}
