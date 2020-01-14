import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarTechnicalDocumentationSharedModule } from 'app/shared/shared.module';
import { CarOwnwerComponent } from './car-ownwer.component';
import { CarOwnwerDetailComponent } from './car-ownwer-detail.component';
import { CarOwnwerUpdateComponent } from './car-ownwer-update.component';
import { CarOwnwerDeleteDialogComponent } from './car-ownwer-delete-dialog.component';
import { carOwnwerRoute } from './car-ownwer.route';

@NgModule({
  imports: [CarTechnicalDocumentationSharedModule, RouterModule.forChild(carOwnwerRoute)],
  declarations: [CarOwnwerComponent, CarOwnwerDetailComponent, CarOwnwerUpdateComponent, CarOwnwerDeleteDialogComponent],
  entryComponents: [CarOwnwerDeleteDialogComponent]
})
export class CarTechnicalDocumentationCarOwnwerModule {}
