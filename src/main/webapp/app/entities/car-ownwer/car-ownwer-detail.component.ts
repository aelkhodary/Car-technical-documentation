import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarOwnwer } from 'app/shared/model/car-ownwer.model';

@Component({
  selector: 'jhi-car-ownwer-detail',
  templateUrl: './car-ownwer-detail.component.html'
})
export class CarOwnwerDetailComponent implements OnInit {
  carOwnwer: ICarOwnwer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carOwnwer }) => {
      this.carOwnwer = carOwnwer;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
