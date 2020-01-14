import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarOwnwer } from 'app/shared/model/car-ownwer.model';
import { CarOwnwerService } from './car-ownwer.service';

@Component({
  templateUrl: './car-ownwer-delete-dialog.component.html'
})
export class CarOwnwerDeleteDialogComponent {
  carOwnwer?: ICarOwnwer;

  constructor(protected carOwnwerService: CarOwnwerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carOwnwerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carOwnwerListModification');
      this.activeModal.close();
    });
  }
}
