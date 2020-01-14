import { IDocument } from 'app/shared/model/document.model';
import { ICarOwnwer } from 'app/shared/model/car-ownwer.model';

export interface ICar {
  id?: number;
  model?: string;
  documents?: IDocument[];
  carOwnwers?: ICarOwnwer[];
}

export class Car implements ICar {
  constructor(public id?: number, public model?: string, public documents?: IDocument[], public carOwnwers?: ICarOwnwer[]) {}
}
