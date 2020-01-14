import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarOwnwer, CarOwnwer } from 'app/shared/model/car-ownwer.model';
import { CarOwnwerService } from './car-ownwer.service';
import { CarOwnwerComponent } from './car-ownwer.component';
import { CarOwnwerDetailComponent } from './car-ownwer-detail.component';
import { CarOwnwerUpdateComponent } from './car-ownwer-update.component';

@Injectable({ providedIn: 'root' })
export class CarOwnwerResolve implements Resolve<ICarOwnwer> {
  constructor(private service: CarOwnwerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarOwnwer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carOwnwer: HttpResponse<CarOwnwer>) => {
          if (carOwnwer.body) {
            return of(carOwnwer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarOwnwer());
  }
}

export const carOwnwerRoute: Routes = [
  {
    path: '',
    component: CarOwnwerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechnicalDocumentationApp.carOwnwer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarOwnwerDetailComponent,
    resolve: {
      carOwnwer: CarOwnwerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechnicalDocumentationApp.carOwnwer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarOwnwerUpdateComponent,
    resolve: {
      carOwnwer: CarOwnwerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechnicalDocumentationApp.carOwnwer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarOwnwerUpdateComponent,
    resolve: {
      carOwnwer: CarOwnwerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechnicalDocumentationApp.carOwnwer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
