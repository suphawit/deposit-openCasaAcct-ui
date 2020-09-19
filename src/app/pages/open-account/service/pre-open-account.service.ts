import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreOpenAccountService {

  constructor(
  ) { }

  private customerInfomationSource: any;
  private data: any;
  private dataCondition: any;
  private test: any;

  setCustomerSource(data) {
    this.customerInfomationSource = data;
  }
  getCustomerInfomation() {
    return this.customerInfomationSource;
  }

  setTransId(transid, logId) {
    this.data = { transId: transid, logid: logId };
  }
  getTransId() {
    return this.data;
  }

  setSearchCondition(data) {
    this.dataCondition = data;
  }
  getSearchCondition() {
    return this.dataCondition;
  }
  setTest(data) {
    this.test = data;
  }
  getTest() {
    return this.test;
  }
}
