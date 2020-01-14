import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CarTechnicalDocumentationTestModule } from '../../../test.module';
import { CarOwnwerDetailComponent } from 'app/entities/car-ownwer/car-ownwer-detail.component';
import { CarOwnwer } from 'app/shared/model/car-ownwer.model';

describe('Component Tests', () => {
  describe('CarOwnwer Management Detail Component', () => {
    let comp: CarOwnwerDetailComponent;
    let fixture: ComponentFixture<CarOwnwerDetailComponent>;
    const route = ({ data: of({ carOwnwer: new CarOwnwer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CarTechnicalDocumentationTestModule],
        declarations: [CarOwnwerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CarOwnwerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarOwnwerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load carOwnwer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.carOwnwer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
