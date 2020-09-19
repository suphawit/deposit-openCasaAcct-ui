import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Constants {
    CTX = '/EAPP/eapp_service';

    SYSTEM_CODE = 'EAP';
    CHANNEL_ID = 'EAP';
    SYSTEM_CODE_IDPASS = 'IDPass';
    CHANNEL_ID_IDPASS = 'IDPass';

    SERVICE_NAME: {
        GET_CUSTOMER_PROFILE: string,
        GET_ADDRESS_INFO_BYPOSTAL_CODE: string,
        GET_ADDRESS_INFO_BY_PROVINCE_AND_DISTRICT: string,
        GET_DISTRICT_BY_PROVINCE: string,
        GET_ALL_PROVINCE: string,
        GET_ALL_PRODUCT_TYPE: string,
        GET_PORDUCT_DETAIL: string,
        GET_CONFIG_LIST: string,
        SUBMIT_OPEN_ACCOUNT: string,
        APPROVE_OPEN_ACCOUNT: string,
        RETRIVE_STATUS_OPEN_ACCOUNT: string,
        GET_ALL_COUNTRY: string
        GET_CONTENT: string
        GET_ERR_REQ_REDIRECE: string
        GET_ALL_CUSTOMER_ID_TYPE: string
        SEARCH_OPEN_INQUIRY_EXPORT: string
        GET_INQUIRY_BY_LOG_ID: string
        GET_SIGNATURE_BY_INQUIRY: string
        GET_RESEND_EMAIL: string
        GET_INQUIRY_ACCOUNT_ADDRESS: string
        GET_OPEN_ACCOUNT_REPROT: string
        GET_OPEN_APP_FORM: string
        RESEND_RP_REQUEST: string
        INTERNAL_OPEN_APP_FORM: string
    };

    SUBSCRIPTION: {
        KK_E_BANKING: string
    };

    CUST_AUTHEN_STATUS_CODE: {
        PENDING: string,
        REJECTED: string,
        COMPLETED: string
    };

    CUST_AUTHEN_STATUS_MESSAGE: {
        PENDING: string,
        REJECTED: string,
        COMPLETED: string
    };

    constructor() {
        this.SERVICE_NAME = {
            GET_CUSTOMER_PROFILE: 'GetCustomerProfile',
            GET_ADDRESS_INFO_BYPOSTAL_CODE: 'GetAddressInfoByPostalCode',
            GET_ADDRESS_INFO_BY_PROVINCE_AND_DISTRICT: 'GetAddressInfoByProvinceAndDistrict',
            GET_DISTRICT_BY_PROVINCE: 'GetDistrictByProvince',
            GET_ALL_PROVINCE: 'FindAllProvinces',
            GET_ALL_PRODUCT_TYPE: 'GetAllProductType',
            // GET_PORDUCT_DETAIL: 'GetAllProductByProductType',
            GET_PORDUCT_DETAIL: 'GetAllProductByAccountType',
            GET_CONFIG_LIST: 'GetConfigList',
            SUBMIT_OPEN_ACCOUNT: 'SubmitOpenAccount',
            APPROVE_OPEN_ACCOUNT: 'ApproveTransaction',
            RETRIVE_STATUS_OPEN_ACCOUNT: 'ReteiveStatusAndOpenAccount',
            GET_ALL_COUNTRY: 'GetAllCountry',
            GET_CONTENT: 'GetContent',
            GET_ERR_REQ_REDIRECE: 'GetErrReqRedirect',
            GET_ALL_CUSTOMER_ID_TYPE: 'GetAllCustomerIDType',
            SEARCH_OPEN_INQUIRY_EXPORT: 'SearchOpenAccountInquiry',
            GET_INQUIRY_BY_LOG_ID: 'GetInquiryByLogId',
            GET_SIGNATURE_BY_INQUIRY: 'GetSignatureById',
            GET_RESEND_EMAIL: 'ResendEmail',
            GET_INQUIRY_ACCOUNT_ADDRESS: 'InquiryAccountAddress',
            GET_OPEN_ACCOUNT_REPROT: 'GetOpenAccountReport',
            GET_OPEN_APP_FORM: 'OpenAppForm',
            INTERNAL_OPEN_APP_FORM: 'InternalOpenAppForm',
            RESEND_RP_REQUEST: 'ResendRPRequest',
        };

        this.SUBSCRIPTION = {
            KK_E_BANKING: 'บริการ KKP e-Banking (บริการธนาคารทางอินเตอร์เน็ต)'
        };

        this.CUST_AUTHEN_STATUS_CODE = {
            PENDING: 'pending',
            REJECTED: 'rejected',
            COMPLETED: 'completed'
        };

        this.CUST_AUTHEN_STATUS_MESSAGE = {
            PENDING: 'อยู่ระหว่างดำเนินการ (Pending)',
            REJECTED: 'ปฏิเสธการยืนยันตัวตน (Rejected)',
            COMPLETED: 'ยืนยันตัวตนสำเร็จ (Completed)'
        };
    }
}
