import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PositionService{
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // withCredentials: true
  };

    constructor(private httpClient: HttpClient){}

    getPositionList(searchField?: any, pageNo?: number, pageSize?: number) {
    let params = new HttpParams();

    if (searchField?.positionId && searchField.positionId != 0) {
      params = params.append('positionId', searchField?.positionId ?? 0);
    }

    if (pageNo) params = params.append('pageno', pageNo);

    if (pageSize) params = params.append('pagesize', pageSize);

    return this.httpClient.get<any>(
      `https://localhost:7299/api/Position`,
      {
        ...this.httpOptions,
        params: params
      }
    );
  }
}