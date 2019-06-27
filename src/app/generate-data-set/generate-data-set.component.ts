import {Component, OnInit} from '@angular/core';
import {DistributionType} from '../distribution/distribution-type.enum';

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
  private firstParam: number;
  private secondParam: number;
  private size: number;


  constructor() { }

  ngOnInit() {
    this.distributionType = DistributionType.NORMAL;
  }

  click() {
    console.log("type: " + this.distributionType);
    console.log("p1: " + this.firstParam);
    console.log("p2: " + this.secondParam);
    console.log("size: " + this.size);
  }

}
