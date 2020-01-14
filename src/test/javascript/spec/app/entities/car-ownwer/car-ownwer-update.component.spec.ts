import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CarTechnicalDocumentationTestModule } from '../../../test.module';
import { CarOwnwerUpdateComponent } from 'app/entities/car-ownwer/car-ownwer-update.component';
import { CarOwnwerService } from 'app/entities/car-ownwer/car-ownwer.service';
import { CarOwnwer } from 'app/shared/model/car-ownwer.model';

describe('Component Tests', () => {
  describe('CarOwnwer Management Update Component', () => {
    let comp: CarOwnwerUpdateComponent;
    let fixture: ComponentFixture<CarOwnwerUpdateComponent>;
    let service: CarOwnwerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CarTechnicalDocumentationTestModule],
        declarations: [CarOwnwerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CarOwnwerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarOwnwerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarOwnwerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CarOwnwer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CarOwnwer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
