import {DistributionParameter} from './distribution-parameter';
import {DistributionPoint} from './distribution-point';

export class DistributionSample {

  private _parameters: Array<DistributionParameter>;
  private _countOfDimensional: number;
  private _mean: number;
  private _median: number;
  private _mode: number;
  private _sample: Array<DistributionPoint>;
  private _scale: number;
  private _size: number;
  private _type: string;


  get parameters(): Array<DistributionParameter> {
    return this._parameters;
  }

  set parameters(value: Array<DistributionParameter>) {
    this._parameters = value;
  }

  get countOfDimensional(): number {
    return this._countOfDimensional;
  }

  set countOfDimensional(value: number) {
    this._countOfDimensional = value;
  }

  get mean(): number {
    return this._mean;
  }

  set mean(value: number) {
    this._mean = value;
  }

  get median(): number {
    return this._median;
  }

  set median(value: number) {
    this._median = value;
  }

  get mode(): number {
    return this._mode;
  }

  set mode(value: number) {
    this._mode = value;
  }

  get sample(): Array<DistributionPoint> {
    return this._sample;
  }

  set sample(value: Array<DistributionPoint>) {
    this._sample = value;
  }

  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
