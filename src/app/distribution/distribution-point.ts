export class DistributionPoint {

  private _values: Array<number>;
  private _density: number;


  constructor(values: Array<number>, density: number) {
    this._values = values;
    this._density = density;
  }


  get values(): Array<number> {
    return this._values;
  }

  set values(value: Array<number>) {
    this._values = value;
  }

  get density(): number {
    return this._density;
  }

  set density(value: number) {
    this._density = value;
  }
}
