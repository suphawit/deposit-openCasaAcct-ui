import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedServiceModule } from './shared/service/shared-service.module';
import { OpenAccountVerifyModule } from './pages/open-account-verify/open-account-verify.module';
import { OpenAccountSummaryModule } from './pages/open-account-summary/open-account-summary.module';
import { ExceptionDialogModule } from './shared/components/popup/exception-dialog/exception-dialog.module';
import { ExceptionDialogComponent } from './shared/components/popup/exception-dialog/exception-dialog.component';
import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedServiceModule.forRoot(),
    OpenAccountVerifyModule,
    OpenAccountSummaryModule,
    ExceptionDialogModule,
    StorageServiceModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExceptionDialogComponent]
})
export class AppModule { }
