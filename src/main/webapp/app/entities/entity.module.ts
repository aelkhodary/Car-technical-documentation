import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        loadChildren: () => import('./car/car.module').then(m => m.CarTechnicalDocumentationCarModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.CarTechnicalDocumentationDocumentModule)
      },
      {
        path: 'content',
        loadChildren: () => import('./content/content.module').then(m => m.CarTechnicalDocumentationContentModule)
      },
      {
        path: 'car-ownwer',
        loadChildren: () => import('./car-ownwer/car-ownwer.module').then(m => m.CarTechnicalDocumentationCarOwnwerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CarTechnicalDocumentationEntityModule {}
