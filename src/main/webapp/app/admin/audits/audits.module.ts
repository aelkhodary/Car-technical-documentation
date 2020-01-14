import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarTechnicalDocumentationSharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [CarTechnicalDocumentationSharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent]
})
export class AuditsModule {}
