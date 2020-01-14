import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarOwnwer, CarOwnwer } from 'app/shared/model/car-ownwer.model';
import { CarOwnwerService } from './car-ownwer.service';

@Component({
  selector: 'jhi-car-ownwer-update',
  templateUrl: './car-ownwer-update.component.html'
})
export class CarOwnwerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected carOwnwerService: CarOwnwerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carOwnwer }) => {
      this.updateForm(carOwnwer);
    });
  }

  updateForm(carOwnwer: ICarOwnwer): void {
    this.editForm.patchValue({
      id: carOwnwer.id,
      name: carOwnwer.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carOwnwer = this.createFromForm();
    if (carOwnwer.id !== undefined) {
      this.subscribeToSaveResponse(this.carOwnwerService.update(carOwnwer));
    } else {
      this.subscribeToSaveResponse(this.carOwnwerService.create(carOwnwer));
    }
  }

  private createFromForm(): ICarOwnwer {
    return {
      ...new CarOwnwer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarOwnwer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
