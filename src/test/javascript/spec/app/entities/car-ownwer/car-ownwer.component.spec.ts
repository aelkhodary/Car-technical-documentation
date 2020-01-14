import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CarTechnicalDocumentationTestModule } from '../../../test.module';
import { CarOwnwerComponent } from 'app/entities/car-ownwer/car-ownwer.component';
import { CarOwnwerService } from 'app/entities/car-ownwer/car-ownwer.service';
import { CarOwnwer } from 'app/shared/model/car-ownwer.model';

describe('Component Tests', () => {
  describe('CarOwnwer Management Component', () => {
    let comp: CarOwnwerComponent;
    let fixture: ComponentFixture<CarOwnwerComponent>;
    let service: CarOwnwerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CarTechnicalDocumentationTestModule],
        declarations: [CarOwnwerComponent],
        providers: []
      })
        .overrideTemplate(CarOwnwerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarOwnwerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarOwnwerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CarOwnwer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.carOwnwers && comp.carOwnwers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
