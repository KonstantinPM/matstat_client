import {Component, OnInit} from '@angular/core';
import {DistributionType} from '../distribution/distribution-type.enum';
import {FormControl, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {DistributionService} from '../services/distribution.service';
import {DistributionSample} from '../distribution/distribution-sample';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {DistributionPoint} from '../distribution/distribution-point';

@Component({
  selector: 'app-generate-data-set',
  templateUrl: './generate-data-set.component.html',
  styleUrls: ['./generate-data-set.component.css']
})
export class GenerateDataSetComponent implements OnInit {

  private distributionTypes = [
    DistributionType.NORMAL,
    DistributionType.EXPONENTIAL,
    DistributionType.EXTREMAL_MAX,
    DistributionType.LAPLACE,
    DistributionType.LOGNORMAL,
    DistributionType.STUDENT,
    DistributionType.UNIFORM,
    DistributionType.WEIBUL
  ];

  private distributionType: DistributionType;
  private firstParamPH;
  private secondParamPH;
  private firstParam: number;
  private secondParam: number;
  private size: number;
  private firstParamFormControl: FormControl;
  private secondParamFormControl: FormControl;
  private sizeFormControl: FormControl;
  private isValidForm: boolean;
  private haveOnlyOneParameter: boolean;
  private distributionSample: DistributionSample;

  private scatterChartData: ChartDataSets[];
  private scatterChartOptions: ChartOptions;
  private scatterChartType: ChartType;

  constructor(private distributionService: DistributionService) { }

  ngOnInit() {
    this.distributionType = DistributionType.NORMAL;
    this.firstParamPH = "m";
    this.secondParamPH = "\u03C3";
    this.haveOnlyOneParameter = false;

    this.firstParamFormControl = new FormControl('', [
      Validators.required,
      Validators.min(-1000000),
      Validators.max(1000000)
    ]);
    this.secondParamFormControl = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(1000)
    ]);
    this.sizeFormControl = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100000)
    ]);

    merge(this.firstParamFormControl.valueChanges,
          this.secondParamFormControl.valueChanges,
          this.sizeFormControl.valueChanges)
      .subscribe(() => this.isValidForm = this.firstParamFormControl.valid &&
                                                (this.secondParamFormControl.valid || this.haveOnlyOneParameter) &&
                                                this.sizeFormControl.valid);

    this.scatterChartType = 'scatter';
    this.scatterChartOptions = {
      responsive: true,
      legend: {
        position: 'bottom'
      }
    };
  }

  onChangeDistType() {
    console.log(this.distributionType);

    switch (this.distributionType) {
      case DistributionType.NORMAL:
      case DistributionType.LOGNORMAL:
      case DistributionType.EXTREMAL_MAX:
        this.firstParamPH = 'm';
        this.secondParamPH = '\u03C3';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(-1000000), Validators.max(1000000)]);
        this.secondParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.haveOnlyOneParameter = false;
        break;
      case DistributionType.EXPONENTIAL:
        this.firstParamPH = '\u03BB';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.haveOnlyOneParameter = true;
        break;
      case DistributionType.STUDENT:
        this.firstParamPH = '\u03BD';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.haveOnlyOneParameter = true;
        break;
      case DistributionType.LAPLACE:
        this.firstParamPH = '\u03B1';
        this.secondParamPH = '\u03B2';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.secondParamFormControl.setValidators([Validators.required, Validators.min(-1000000), Validators.max(1000000)]);
        this.haveOnlyOneParameter = false;
        break;
      case DistributionType.UNIFORM:
        this.firstParamPH = 'a';
        this.secondParamPH = 'b';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(-1000000), Validators.max(1000000)]);
        this.secondParamFormControl.setValidators([Validators.required, Validators.min(-1000000), Validators.max(1000000)]);
        this.haveOnlyOneParameter = false;
        break;
      case DistributionType.WEIBUL:
        this.firstParamPH = '\u03B1';
        this.secondParamPH = '\u03B2';
        this.firstParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.secondParamFormControl.setValidators([Validators.required, Validators.min(1), Validators.max(1000)]);
        this.haveOnlyOneParameter = false;
        break;
    }

    this.firstParamFormControl.updateValueAndValidity();
    this.secondParamFormControl.updateValueAndValidity();

  }

  generateButtonClick() {
    const params = [];
    params[0] = this.firstParam;
    if (!this.haveOnlyOneParameter) {
      params[1] = this.secondParam;
    }

    this.distributionService.generateDistribution(this.distributionType, params, this.size)
      .subscribe( data =>  {
        this.distributionSample = data;
        this.repaintChart(this.distributionSample)
      });
  }

  repaintChart(data: DistributionSample) {
    let sample = [];
    data.sample.forEach(function(elem: DistributionPoint) {
      sample.push({x: elem.values[0], y: elem.density});
    });

    let label = data.type + "(" + this.firstParam + "-" + this.secondParam + "-" + this.size + ")";

    this.scatterChartData = [{
      data: sample,
      label: label,
      pointRadius: 3,
      pointBackgroundColor: 'blue',
      pointBorderColor: 'none',
      borderColor: 'blue',
      backgroundColor: 'white',
      pointHoverBackgroundColor: 'blue',
      pointHoverBorderColor: 'none'
    }];
  }

}
