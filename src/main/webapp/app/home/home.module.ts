import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarTechnicalDocumentationSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CarTechnicalDocumentationSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class CarTechnicalDocumentationHomeModule {}
