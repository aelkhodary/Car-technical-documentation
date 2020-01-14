export interface ICarOwnwer {
  id?: number;
  name?: string;
}

export class CarOwnwer implements ICarOwnwer {
  constructor(public id?: number, public name?: string) {}
}
