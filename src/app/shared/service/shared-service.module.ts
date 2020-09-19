import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ]
})
export class SharedServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedServiceModule,
        providers: [
        ]
    };
}
}
