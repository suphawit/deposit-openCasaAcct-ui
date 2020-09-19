import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Constants } from './constants';
import { CustomerService } from 'src/app/shared/service/customer.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(
    private api: ApiService,
    private customerService: CustomerService,
    public constants: Constants
  ) { }

  getAddressByPostal(code: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ADDRESS_INFO_BYPOSTAL_CODE;
    const request = { postalCode: code };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data),
      catchError(this.api.handleError)
    );
  }

  getSubdistrictByProvinceAndDistrict(provinceCode: string, districtCode: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ADDRESS_INFO_BY_PROVINCE_AND_DISTRICT;
    const request = {
      district: districtCode,
      province: provinceCode
    };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.subdistrictList),
      catchError(this.api.handleError)
    );
  }

  getDistrictByProvince(provinceCode: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_DISTRICT_BY_PROVINCE;
    const request = { province: provinceCode };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.districtList),
      catchError(this.api.handleError)
    );
  }

  public getProvinceList() {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ALL_PROVINCE;
    const request = {};
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.provinceList),
      catchError(this.api.handleError)
    );
  }

  public getCountryList() {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ALL_COUNTRY;
    const request = {};
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.countryList),
      catchError(this.api.handleError)
    );
  }

  public getProductTypes() {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ALL_PRODUCT_TYPE;
    const request = { channelId: this.customerService.channelId };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.productTypeList),
      catchError(this.api.handleError)
    );
  }

  public getProductDetailByType(type: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_PORDUCT_DETAIL;
    const currencyCode = 'THB';
    const customerType = 'Y';
    const request = { accountType: type, currencyCode: currencyCode, customerType: customerType, channelId: this.customerService.channelId };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data.productList),
      catchError(this.api.handleError)
    );
  }

  public getPurposeOpenAccountList() {
    return this.getConfigList('ACPURIND');
  }

  private getConfigList(configName: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_CONFIG_LIST;
    const request = { refName: configName };
    return this.api.post(url, request).pipe(
      map((res: any) => res.data),
      catchError(this.api.handleError)
    );
  }

  public getContent(contentType: string) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_CONTENT;
    const request = { contentCode: contentType }
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public getAllCustomerIdType() {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_ALL_CUSTOMER_ID_TYPE;
    const request = {};
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public searchOpenInquiry(data) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.SEARCH_OPEN_INQUIRY_EXPORT;
    const request = data;
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public getInquiryByLogLd(data) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_INQUIRY_BY_LOG_ID;
    const request = { logId: data.logid };
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public getSignatureURL(data, logID) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_SIGNATURE_BY_INQUIRY;
    const request = { transId: data, logId: logID };
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public getResendEmail(email, param) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_RESEND_EMAIL;
    const request = { emailCbs: email, logId: param.logid, transId: param.transId };
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

  public getInquiryAccountAddress(param) {
    const url = this.constants.CTX + '/' + this.constants.SERVICE_NAME.GET_INQUIRY_ACCOUNT_ADDRESS;
    const request = { transId: param };
    return this.api.post(url, request).pipe(
      map((res: any) => res),
      catchError(this.api.handleError)
    );
  }

}
