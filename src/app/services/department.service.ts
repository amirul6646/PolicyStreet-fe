import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DepartmentService{
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // withCredentials: true
  };

    constructor(private httpClient: HttpClient){}

    getDepartmentList(searchField?: any, pageNo?: number, pageSize?: number) {
    let params = new HttpParams();

    if (searchField?.departmentId && searchField.departmentId != 0) {
      params = params.append('departmentId', searchField?.departmentId ?? 0);
    }

    if (pageNo) params = params.append('pageno', pageNo);

    if (pageSize) params = params.append('pagesize', pageSize);

    return this.httpClient.get<any>(
      `https://localhost:7299/api/Department`,
      {
        ...this.httpOptions,
        params: params
      }
    );
  }
}