import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenInquiryExportComponent } from './open-inquiry-export.component';

const routes: Routes = [
  {
    path: 'logid/:logid', component: OpenInquiryExportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenInquiryExportRoutingModule { }
