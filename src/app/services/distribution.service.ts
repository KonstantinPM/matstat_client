import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DistributionType} from '../distribution/distribution-type.enum';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DistributionSample} from '../distribution/distribution-sample';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private httpClient: HttpClient) { }

  generateDistribution(distributionType: DistributionType, params: Array<number>, size: number): Observable<DistributionSample> {
    console.log("generate sample:" +
                "\n type: " + distributionType +
                "\n params: " + params +
                "\n size: " + size);

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    let parameters = new HttpParams()
      .set('distType', distributionType.toLowerCase())
      .set('distSize', String(size))
      .set('param1', String(params[0]));

    if (params.length === 2) {
      parameters = parameters.set('param2', String(params[1]));
    }

    return this.httpClient.get<DistributionSample>(environment.server_url + "/getSample", {params: parameters, headers: headers});
  }
}
