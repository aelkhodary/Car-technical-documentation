import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarOwnwer } from 'app/shared/model/car-ownwer.model';
import { CarOwnwerService } from './car-ownwer.service';
import { CarOwnwerDeleteDialogComponent } from './car-ownwer-delete-dialog.component';

@Component({
  selector: 'jhi-car-ownwer',
  templateUrl: './car-ownwer.component.html'
})
export class CarOwnwerComponent implements OnInit, OnDestroy {
  carOwnwers?: ICarOwnwer[];
  eventSubscriber?: Subscription;

  constructor(protected carOwnwerService: CarOwnwerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.carOwnwerService.query().subscribe((res: HttpResponse<ICarOwnwer[]>) => {
      this.carOwnwers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarOwnwers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarOwnwer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarOwnwers(): void {
    this.eventSubscriber = this.eventManager.subscribe('carOwnwerListModification', () => this.loadAll());
  }

  delete(carOwnwer: ICarOwnwer): void {
    const modalRef = this.modalService.open(CarOwnwerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carOwnwer = carOwnwer;
  }
}
