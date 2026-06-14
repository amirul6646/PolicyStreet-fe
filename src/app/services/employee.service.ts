import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // withCredentials: true
  };

  constructor(private httpClient: HttpClient) {}

  getEmployeeList(searchField?: any, pageNo?: number, pageSize?: number) {
    let params = new HttpParams();

    if (searchField?.fullName && searchField.fullName != 0) {
      params = params.append('FullName', searchField?.fullName ?? 0);
    }

    if (searchField?.employeeCode && searchField.employeeCode != '') {
      params = params.append('EmployeeCode', searchField?.employeeCode ?? '');
    }

    if (searchField?.departmentId && searchField.departmentId != 0) {
      params = params.append('DepartmentId', searchField?.departmentId ?? 0);
    }

    if (searchField?.positionId && searchField.positionId != 0) {
      params = params.append('PositionId', searchField?.positionId ?? 0);
    }

    if (pageNo) params = params.append('pageno', pageNo);

    if (pageSize) params = params.append('pagesize', pageSize);

    return this.httpClient.get<any>(`https://localhost:7299/api/Employee`, {
      ...this.httpOptions,
      params: params,
    });
  }

  getEmployeeById(employeeId: number) {
    let params = new HttpParams();



    return this.httpClient.get<any>(`https://localhost:7299/api/Employee/`+employeeId, {
      ...this.httpOptions,
      params: params,
    });
  }

  addEmployee(employeeInfo: any) {
    return this.httpClient.post<any>(
      `https://localhost:7299/api/Employee`,
      employeeInfo,
      this.httpOptions,
    );
  }

  updateEmployee(employeeId: number,employeeInfo: any) {
    return this.httpClient.put<any>(
      `https://localhost:7299/api/Employee/`+employeeId,
      employeeInfo,
      this.httpOptions,
    );
  }

  deleteEmployee(employeeId: number) {
    return this.httpClient.delete<any>(
      `https://localhost:7299/api/Employee/${employeeId}`,
      this.httpOptions,
    );
  }
}
